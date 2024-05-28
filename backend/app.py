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
#     "os": "windows"
# }

@app.route('/api/pslist', methods=['POST'])
def pslist():
    data = request.get_json()
    filepath = data.get('filepath')
    operatingSystem = data.get('os')
    print(f"Received filepath: {filepath}")

    if not filepath or not os.path.isfile(filepath):
        print(f"Invalid file path: {filepath}")
        return jsonify({'error': 'Invalid file path'}), 400

    try:
        print(f"Running Volatility command on {filepath}")
        result = subprocess.run(
            ['python', '../volatility3/vol.py', '-f', filepath, f"{operatingSystem}.pslist"],
            capture_output=True, text=True, check=True
        )
        output = result.stdout.strip()
        json_data = create_processes_object(output)

        return json_data
    except subprocess.CalledProcessError as e:
        print(f"Command failed with error: {str(e)}")
        print(f"Command output: {e.output}")
        return jsonify({'error': str(e), 'output': e.output}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True) # Possibly remove host
    print(f"Server started yayy")

