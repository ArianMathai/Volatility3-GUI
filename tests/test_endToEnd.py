import subprocess

import pytest
import requests
import os


# Fixture to start the server in a separate process
@pytest.fixture(scope="module", autouse=True)
def run_server():
    subprocess.Popen(['python', '../backend/app.py'])
    # Provide the server URL to the tests
    yield "http://localhost:8000"

    # Clean up: terminate the server process


def test_end_to_end_pslist(run_server):
    """End-to-end test for the POST /api/pslist endpoint."""
    # Make a request to the server

    test_dir = os.path.dirname(os.path.abspath(__file__))
    memory_dump_filename = '20210430-Win10Home-20H2-64bit-memdump.mem'  # Remove the leading './'
    memory_dump_path = os.path.join(test_dir, memory_dump_filename)

    data = {"filepath": memory_dump_path,
            "os": "windows",
            "plugin": "pslist"}
    response = requests.post(f"{run_server}/api/runplugin", json=data)

    # Assert the response
    assert response.status_code == 200
    assert "processes" in response.json()
