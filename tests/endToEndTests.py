import pytest
import requests

@pytest.fixture
def server_url():
    """Return the URL of the server."""
    return 'http://localhost:8000'  # Adjust the URL as needed

def test_end_to_end_pslist(server_url):
    """End-to-end test for the POST /api/pslist endpoint."""
    # Make a request to the server
    data = {'filepath': '/path/to/test/file', 'os': 'windows'}
    response = requests.post(f'{server_url}/api/pslist', json=data)

    # Assert the response
    assert response.status_code == 200
    assert 'processes' in response.json()  # Assuming the response contains 'processes'