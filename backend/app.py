import json

from flask import Flask, jsonify, request
from util.create_processes_object import create_processes_object
import subprocess

import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

env = os.environ.copy()
env['PYTHONIOENCODING'] = 'utf-8'
env['PYTHONUTF8'] = '1'

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
    plugin = data.get('plugin').lower()  # Convert plugin name to lowercase

    backend_dir = os.path.dirname(os.path.abspath(__file__))
    volatility_script = 'vol.py'  # Remove the leading './'
    volatility_script = os.path.join(backend_dir, "../../../../volatility3/", volatility_script)
    print(backend_dir)

    if not filepath or not os.path.isfile(filepath):
        print(f"Invalid file path: {filepath}")
        return jsonify({'error': 'Invalid file path'}), 400

    try:
        print(f"Running Volatility command on {filepath}")
        try:
            result = subprocess.run(
                ['python3', volatility_script, '-f', filepath, f"{operatingSystem}.{plugin}"],
                capture_output=True, encoding='utf-8', check=True, env=env
            )
        except subprocess.CalledProcessError as e:
            print(f"Error running command with python3: {e}")
            result = subprocess.run(
                ['python', volatility_script, '-f', filepath, f"{operatingSystem}.{plugin}"],
                capture_output=True, encoding='utf-8', check=True, env=env
            )

        output = result.stdout
        data = create_processes_object(output, plugin)
        json_data = jsonify(data)

        return json_data
    except subprocess.CalledProcessError as e:
        print(f"Command failed with error: {str(e)}")
        print(f"Command output: {e.output}")
        return jsonify({'error': str(e), 'output': e.output}), 500

# {
#       "filepath": "yourFilePath"
# }

@app.route('/api/get-plugins', methods=['POST'])
def get_plugins():
    try:
        data = request.get_json()
        platform = data.get('os')

        if not platform:
            return jsonify({"error": "Platform not specified"}), 400

        file_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "plugins.json")
        plugin_list = []
        with open(file_path) as file:
            plugins = json.load(file)
            for plugin in plugins:
                if plugin['platform'] == platform:
                    plugin_list.append(plugin)

        return jsonify({"plugins": plugin_list}), 200

    except Exception as e:
        print(f"Error in get_plugins: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/detectos', methods=['POST'])
def auto_detect_os():
    data = request.get_json()
    filepath = data.get('filepath')
    file_operating_system = ["windows", "linux", "mac"]

    backend_dir = os.path.dirname(os.path.abspath(__file__))
    volatility_script = 'vol.py'  # Remove the leading './'
    volatility_script = os.path.join(backend_dir, "../../../../volatility3/", volatility_script)

    if not filepath or not os.path.isfile(filepath):
        print(f"Invalid file path: {filepath}")
        return jsonify({'error': 'Invalid file path'}), 400

    for file_os in file_operating_system:
        try:
            result = subprocess.run(
                ['python3', volatility_script, '-f', filepath, f"{file_os}.info"],
                capture_output=True, encoding='utf-8', check=True, env=env
            )
        except subprocess.CalledProcessError as e:
            print(f"Error running plugin {file_os} with python3: {e}")
            try:
                result = subprocess.run(
                    ['python', '../../../../volatility3/vol.py', '-f', filepath, f"{file_os}.info"],
                    capture_output=True, encoding='utf-8', check=True, env=env
                )
            except subprocess.CalledProcessError as e:
                print(f"Error running plugin {file_os} with python: {e}")
                continue

        output = result.stdout
        if output:
            data = create_processes_object(output, "")
            print(f"OS", file_os)
            return jsonify({"os": file_os, "data": data}), 200

    return jsonify({'error': 'Could not detect OS. Failed to retrieve system info. Wrong format, corrupt file or something went wrong.'}), 500

@app.route('/api/runpluginwithpid', methods=['POST'])
def run_plugin_with_pid():
    data = request.get_json()
    filepath = data.get('filepath')
    operating_system = data.get('os')
    plugin = data.get('plugin').lower()  # Convert plugin name to lowercase
    pid = data.get('pid')

    backend_dir = os.path.dirname(os.path.abspath(__file__))
    volatility_script = 'vol.py'  # Remove the leading './'
    volatility_script = os.path.join(backend_dir, "../../../../volatility3/", volatility_script)

    if not filepath or not os.path.isfile(filepath) or not pid:
        return jsonify({'error': 'Invalid file path or PID'}), 400

    try:
        print(f"Running Volatility command with PID {pid} on {filepath}")
        try:
            result = subprocess.run(
                ['python3', volatility_script, '-f', filepath, f"{operating_system}.{plugin}", '--pid', pid],
                capture_output=True, encoding='utf-8', check=True, env=env
            )
        except subprocess.CalledProcessError as e:
            print(f"Error running command with python3: {e}")
            result = subprocess.run(
                ['python', volatility_script, '-f', filepath, f"{operating_system}.cmdline", '--pid', pid],
                capture_output=True, encoding='utf-8', check=True, env=env
            )

        output = result.stdout.strip()
        data = create_processes_object(output, "")
        json_data = jsonify(data)

        return json_data
    except subprocess.CalledProcessError as e:
        print(f"Command failed with error: {str(e)}")
        print(f"Command output: {e.output}")
        return jsonify({'error': str(e), 'output': e.output}), 500


@app.route('/api/run-dumpfiles', methods=['POST'])
def run_dumpfiles_with_phisical_address():
    data = request.get_json()
    filepath = data.get('filepath')
    operating_system = data.get('os')
    outputDir = data.get('outputDir')
    physaddr = data.get('physaddr') # Convert plugin name to lowercase

    backend_dir = os.path.dirname(os.path.abspath(__file__))
    volatility_script = 'vol.py'  # Remove the leading './'
    volatility_script = os.path.join(backend_dir, "../../../../volatility3/", volatility_script)

    if not filepath or not os.path.isfile(filepath) or not physaddr:
        return jsonify({'error': 'Invalid file path or physical address'}), 400

    try:
        print(f"Running Volatility command with physical address {physaddr} on {filepath}")
        try:
            result = subprocess.run(
                ['python3', volatility_script, '-f', filepath,
                    f"--output-dir={outputDir}", f"{operating_system}.dumpfiles",
                    '--physaddr', physaddr],
                capture_output=True, encoding='utf-8', check=True, env=env
            )
        except subprocess.CalledProcessError as e:
            print(f"Error running command with python3: {e}")
            result = subprocess.run(
                ['python', volatility_script, '-f', filepath
                 ,f"--output-dir={outputDir}", f"{operating_system}.dumpfiles",
                 '--physaddr', physaddr],
                capture_output=True, encoding='utf-8', check=True, env=env
            )

        # output = result.stdout.strip()
        # data = create_processes_object(output, "")
        # json_data = jsonify(data)

        return jsonify({"message": "Physical address was successfully dumped"}), 200
    except subprocess.CalledProcessError as e:
        print(f"Command failed with error: {str(e)}")
        print(f"Command output: {e.output}")
        return jsonify({'error': str(e), 'output': e.output}), 500


@app.route('/api/dump-with-pid', methods=['POST'])
def run_plugin_with_dump_and_pid():
    data = request.get_json()
    filepath = data.get('filepath')
    operating_system = data.get('os')
    plugin = data.get('plugin').lower()  # Convert plugin name to lowercase
    outputDir = data.get('outputDir')
    pid = data.get('pid')

    backend_dir = os.path.dirname(os.path.abspath(__file__))
    volatility_script = 'vol.py'  # Remove the leading './'
    volatility_script = os.path.join(backend_dir, "../../../../volatility3/", volatility_script)

    print(filepath)
    print(outputDir)

    if not filepath or not os.path.isfile(filepath):
        return jsonify({'error': 'Invalid file path or PID'}), 400

    command = [
        'python3', volatility_script, '-f', filepath,
        f"--output-dir={outputDir}", f"{operating_system}.{plugin}",
        f"--pid", pid, "--dump"
    ]
    command2 = [
        'python', volatility_script, '-f', filepath,
        f"--output-dir={outputDir}", f"{operating_system}.{plugin}",
        f"--pid", pid, "--dump"
    ]

    try:
        try:
            result = subprocess.run(
                command,
                capture_output=True, encoding='utf-8', check=True
            )
        except subprocess.CalledProcessError as e:
            print(f"Error running command with python3: {e}")
            result = subprocess.run(
                command2,
                capture_output=True, encoding='utf-8', check=True
            )

        return jsonify({'data': f'dump successful to {outputDir}'}), 200
    except subprocess.CalledProcessError as e:
        return jsonify({'error': f'Failed to dump file to {outputDir}'}), 500


@app.route('/api/dump', methods=['POST'])
def run_plugin_with_dump():
    data = request.get_json()
    filepath = data.get('filepath')
    operating_system = data.get('os')
    plugin = data.get('plugin').lower()  # Convert plugin name to lowercase
    outputDir = data.get('outputDir')

    backend_dir = os.path.dirname(os.path.abspath(__file__))
    volatility_script = 'vol.py'  # Remove the leading './'
    volatility_script = os.path.join(backend_dir, "../../../../volatility3/", volatility_script)

    print(filepath)
    print(outputDir)

    if not filepath or not os.path.isfile(filepath):
        return jsonify({'error': 'Invalid file path or PID'}), 400

    command = [
        'python3', volatility_script, '-f', filepath,
        f"--output-dir={outputDir}", f"{operating_system}.{plugin}",
        "--dump"
    ]
    command2 = [
        'python', volatility_script, '-f', filepath,
        f"--output-dir={outputDir}", f"{operating_system}.{plugin}",
        "--dump"
    ]

    try:
        try:
            result = subprocess.run(
                command,
                capture_output=True, encoding='utf-8', check=True, env=env
            )
        except subprocess.CalledProcessError as e:
            print(f"Error running command with python3: {e}")
            result = subprocess.run(
                command2,
                capture_output=True, encoding='utf-8', check=True, env=env
            )

        return jsonify({'data': f'dump successful to {outputDir}'}), 200
    except subprocess.CalledProcessError as e:
        return jsonify({'error': f'Failed to dump file to {outputDir}'}), 500



@app.route('/api/get-all-plugins', methods=['GET'])
def get_all_plugins():
    try:
        file_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "plugins.json")
        with open(file_path) as file:
            plugins = json.load(file)
        return jsonify({"plugins": plugins}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    # print("Testing Unicode: âªˆë²‰")
    print("Default encoding:", sys.getdefaultencoding())
    print("File system encoding:", sys.getfilesystemencoding())
    app.run(port=8000)  # Possibly remove host
    print(f"Server started yayy")
