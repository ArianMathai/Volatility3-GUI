import subprocess
from util.create_processes_object import create_processes_object


def get_data():
    try:
        print("Getting data...")
        # Define the command you want to run
        command = ["python", "../volatility3/vol.py", "-f", "./memory-dump/20210430-Win10Home-20H2-64bit-memdump.mem",
                   "windows.pslist"]

        # Run the command
        result = subprocess.run(command, capture_output=True, text=True, timeout=300)  # Add a timeout

        # Check if the command completed successfully
        if result.returncode != 0:
            error_message = f"Command failed with return code {result.returncode}."
            print(error_message)
            return {"message": "", "error": error_message}

        # Get the output from the command
        output = result.stdout.strip()

        json_data = create_processes_object(output)

        return json_data

    except subprocess.TimeoutExpired as e:
        print("Command timed out:", e)
        return {"message": "", "error": "Command timed out"}
    except Exception as e:
        print("Error running command:", e)
        return {"message": "", "error": str(e)}
