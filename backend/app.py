import json

from flask import Flask, jsonify, request
from util.create_processes_object import create_processes_object
import subprocess

import os
import sys

file_dir = os.path.dirname(__file__)
sys.path.append(file_dir)

app = Flask(__name__)


@app.route('/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Python!"})


# Send request body on format:
# {
#     "filepath": "memDumpFilePath",
#     "os": "linux"
#     "plugin": "pslist"
# }

# Send request body on format:
# {
#     "filepath": "memDumpFilePath",
#     "os": "windows",
#     "plugin": "info"
# }
@app.route('/api/runplugin', methods=['POST'])
def runPlugin():
    data = request.get_json()
    filepath = data.get('filepath')
    operatingSystem = data.get('os')
    plugin = data.get('plugin')

    backend_dir = os.path.dirname(os.path.abspath(__file__))
    volatility_script = 'vol.py'  # Remove the leading './'
    volatility_script = os.path.join(backend_dir, "../volatility3/", volatility_script)

    if not filepath or not os.path.isfile(filepath):
        print(f"Invalid file path: {filepath}")
        return jsonify({'error': 'Invalid file path'}), 400

    try:
        print(f"Running Volatility command on {filepath}")
        try:
            result = subprocess.run(
                ['python3', volatility_script, '-f', filepath, f"{operatingSystem}.{plugin}"],
                capture_output=True, text=True, check=True
            )
        except subprocess.CalledProcessError as e:
            print(f"Error running command with python3: {e}")
            result = subprocess.run(
                ['python', volatility_script, '-f', filepath, f"{operatingSystem}.{plugin}"],
                capture_output=True, text=True, check=True
            )

        output = result.stdout.strip()
        data = create_processes_object(output)
        json_data = jsonify(data)

        return json_data
    except subprocess.CalledProcessError as e:
        print(f"Command failed with error: {str(e)}")
        print(f"Command output: {e.output}")
        return jsonify({'error': str(e), 'output': e.output}), 500


# {
#       "filepath": "yourFilePath"
# }
@app.route('/api/detectos', methods=['POST'])
def auto_detect_os():
    data = request.get_json()
    filepath = data.get('filepath')
    file_operating_system = ["windows", "linux", "mac"]

    if not filepath or not os.path.isfile(filepath):
        print(f"Invalid file path: {filepath}")
        return jsonify({'error': 'Invalid file path'}), 400

    for file_os in file_operating_system:
        try:
            result = subprocess.run(
                ['python3', '../volatility3/vol.py', '-f', filepath, f"{file_os}.info"],
                capture_output=True, text=True, check=True
            )
        except subprocess.CalledProcessError as e:
            print(f"Error running plugin {file_os} with python3: {e}")
            try:
                result = subprocess.run(
                    ['python', '../volatility3/vol.py', '-f', filepath, f"{file_os}.info"],
                    capture_output=True, text=True, check=True
                )
            except subprocess.CalledProcessError as e:
                print(f"Error running plugin {file_os} with python: {e}")
                continue

        output = result.stdout.strip()
        if output:
            data = create_processes_object(output)
            return jsonify({"os": file_os}, data), 200

    print("Could not detect OS.")
    return jsonify({'error': 'Could not detect OS'}), 500


@app.route('/api/get-plugins', methods=['POST'])
def get_plugins():
    try:
        data = request.get_json()
        platform = data.get('os')

        if not platform:
            return jsonify({"error": "Platform not specified"}), 400

        file_path = os.path.join(os.path.dirname(__file__), "plugins.json")
        plugin_list = []
        with open(file_path) as file:
            plugins = json.load(file)
            for plugin in plugins:
                if plugin['platform'] == platform:
                    plugin_list.append(plugin)

            print(plugin_list)

            return jsonify({"plugins": plugin_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=8000)  # Possibly remove host
    print(f"Server started yayy")
