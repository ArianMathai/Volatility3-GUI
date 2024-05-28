import pytest
from unittest.mock import MagicMock
import os
import sys
# Add the path to the parent directory of the 'backend' module
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../backend')))

# Now you can import 'app' and other modules from 'backend'
from backend.app import app


@pytest.fixture
def client():
    """Create a test client for the Flask application."""
    with app.test_client() as client:
        yield client

def test_pslist_with_mocked_subprocess(client, monkeypatch):
    """Test the POST /api/pslist endpoint with mocked subprocess."""
    # Mock subprocess.run to return a predefined result
    mock_result = MagicMock()
    mock_result.stdout = b'Sample output'
    mock_run = MagicMock(return_value=mock_result)
    monkeypatch.setattr('subprocess.run', mock_run)

    # Make a request to the endpoint
    # data = {'filepath': 'C:\\Users\\Letri\\OneDrive\\Skrivebord\\smidig-prosjekt\\Volatility3-GUI\\tests\\20210430-Win10Home-20H2-64bit-memdump.mem', 'os': 'windows'}
    data = {
        'filepath': './20210430-Win10Home-20H2-64bit-memdump.mem',
        'os': 'windows'}
    response = client.post('/api/pslist', json=data)

    # Assert that subprocess.run was called with the expected arguments
    mock_run.assert_called_once_with(
        ['python', '../volatility3/vol.py', '-f', './20210430-Win10Home-20H2-64bit-memdump.mem', 'windows.pslist'],
        capture_output=True, text=True, check=True
    )

    # Assert the response
    assert response.status_code == 200
    assert b'Sample output' in response.data
