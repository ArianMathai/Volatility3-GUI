import pytest
import json
import os


from backend.app import app


@pytest.fixture
def client():
    """Create a test client for the Flask application."""
    with app.test_client() as client:
        yield client


def test_get_data(client):
    """Test the GET /data endpoint."""
    response = client.get("/data")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "message" in data
    assert data["message"] == "Hello from Python!"


def test_pslist_with_valid_input(client):
    """Test the POST /api/pslist endpoint with valid input."""
    test_dir = os.path.dirname(os.path.abspath(__file__))
    memory_dump_filename = '20210430-Win10Home-20H2-64bit-memdump.mem'  # Remove the leading './'
    memory_dump_path = os.path.join(test_dir, memory_dump_filename)
    data = {
        "filepath": memory_dump_path,  # Use the absolute path
        "os": "windows",
        "plugin": "pslist"
    }
    response = client.post("/api/runplugin", json=data)
    assert response.status_code == 200
    json_data = json.loads(response.data)
    assert "processes" in json_data


def test_pslist_with_invalid_file_path(client):
    """Test the POST /api/pslist endpoint with invalid file path."""
    data = {
        "filepath": "/invalid/file/path",
        "os": "windows",
        "plugin": "pslist"
    }
    response = client.post("/api/runplugin", json=data)
    assert response.status_code == 400
    error_data = json.loads(response.data)
    assert "error" in error_data
    assert error_data["error"] == "Invalid file path"
