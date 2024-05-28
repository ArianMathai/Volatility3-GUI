from flask import Flask, jsonify, request
import os
import subprocess

app = Flask(__name__)


@app.route('/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Python!"})


@app.route('/api/pslist', methods=['POST'])
def pslist():
    data = request.get_json()
    filepath = data.get('filepath')
    print(f"Received filepath: {filepath}")

    if not filepath or not os.path.isfile(filepath):
        print(f"Invalid file path: {filepath}")
        return jsonify({'error': 'Invalid file path'}), 400

    try:
        print(f"Running Volatility command on {filepath}")
        result = subprocess.run(
            ['python3', '../volatility3/vol.py', '-f', filepath, 'windows.pslist'],
            capture_output=True, text=True, check=True
        )
        print(f"Command output: {result.stdout}")
        return jsonify({'output': result.stdout})
    except subprocess.CalledProcessError as e:
        print(f"Command failed with error: {str(e)}")
        print(f"Command output: {e.output}")
        return jsonify({'error': str(e), 'output': e.output}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True) # Possibly remove host
    print(f"Server started yayy")

