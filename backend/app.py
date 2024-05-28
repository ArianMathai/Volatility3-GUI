from flask import Flask, jsonify, request
import os
import subprocess
from util.create_processes_object import create_processes_object

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
def runPLugin():
    data = request.get_json()
    filepath = data.get('filepath')
    operatingSystem = data.get('os')
    plugin = data.get('plugin')
    print(f"Received filepath: {filepath}")

    if not filepath or not os.path.isfile(filepath):
        print(f"Invalid file path: {filepath}")
        return jsonify({'error': 'Invalid file path'}), 400

    try:
        print(f"Running Volatility command on {filepath}")
        result = subprocess.run(
            ['python3', '../volatility3/vol.py', '-f', filepath, f"{operatingSystem}.{plugin}"],
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
    file_operating_system = ["linux", "windows", "mac"]

    if not filepath or not os.path.isfile(filepath):
        print(f"Invalid file path: {filepath}")
        return jsonify({'error': 'Invalid file path'}), 400

    for file_os in file_operating_system:
        try:
            result = subprocess.run(
                ['python3', '../volatility3/vol.py', '-f', filepath, f"{file_os}.info"],
                capture_output=True, text=True, check=True
            )
            output = result.stdout.strip()
            if output:
                data = create_processes_object(output)
                print(f"Detected OS with plugin {file_os}")
                print(output)
                return jsonify({"os": file_os}, data), 200

        except subprocess.CalledProcessError as e:
            print(f"Error running plugin {file_os}: {e}")
            continue

    print("Could not detect OS.")
    return jsonify({'error': 'Could not detect OS'}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True) # Possibly remove host
    print(f"Server started yayy")

