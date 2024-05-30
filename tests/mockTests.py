import os
import pytest
from unittest.mock import MagicMock

from backend.app import app


@pytest.fixture
def client():
    """Create a test client for the Flask application."""
    with app.test_client() as client:
        yield client


def test_runplugin_with_mocked_subprocess(client, monkeypatch):
    """Test the POST /api/runplugin endpoint with mocked subprocess."""
    # Mock subprocess.run to return a predefined result
    mock_result = MagicMock()
    mock_result.stdout = ("PID	PPID	ImageFileName	Offset(V)	Threads	Handles	SessionId	Wow64	CreateTime	"
                          "ExitTime	File output\n4	0	System	0xbf0f64a63080	132	-	N/A	False	2021-04-30 "
                          "12:39:40.000000 	N/A	Disabled\n108	4	Registry	0xbf0f64bc6040	4	-	N/A	False	"
                          "2021-04-30 12:39:38.000000 	N/A	Disabled\n396	4	smss.exe	0xbf0f66967040	2	-	"
                          "N/A	False	2021-04-30 12:39:40.000000 	N/A	Disabled")
    mock_run = MagicMock(return_value=mock_result)
    monkeypatch.setattr('backend.app.subprocess.run', mock_run)
    test_dir = os.path.dirname(os.path.abspath(__file__))
    memory_dump_filename = '20210430-Win10Home-20H2-64bit-memdump.mem'  # Remove the leading './'
    memory_dump_path = os.path.join(test_dir, memory_dump_filename)

    # Make a request to the endpoint
    data = {
        "filepath": memory_dump_path,
        "os": "windows",
        "plugin": "pslist"
    }
    response = client.post('/api/runplugin', json=data)

    # Assert that subprocess.run was called with the expected arguments

    backend_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = backend_dir.replace("\\tests", "\\backend")
    print(backend_dir)
    volatility_script = 'vol.py'  # Remove the leading './'
    volatility_script = os.path.join(backend_dir, "../volatility3/", volatility_script)

    mock_run.assert_called_once_with(
        ["python", volatility_script, "-f", memory_dump_path, "windows.pslist"],
        capture_output=True, text=True, check=True
    )

    # Assert the response
    assert response.status_code == 200
    assert ('"{\\"processes\\": [{\\"108\\": \\"396\\", \\"4\\": \\"2\\", \\"Registry\\": '
            '\\"smss.exe\\", \\"0xbf0f64bc6040\\": \\"0xbf0f66967040\\", \\"-\\": '
            '\\"-\\", \\"N/A\\": \\"N/A\\", \\"False\\": \\"False\\", \\"2021-04-30\\": '
            '\\"2021-04-30\\", \\"12:39:38.000000\\": \\"12:39:40.000000\\", '
            '\\"Disabled\\": \\"Disabled\\"}]}"\n') in response.data.decode()
