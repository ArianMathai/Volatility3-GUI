import json
import os
import sys

file_dir = os.path.dirname(__file__)
sys.path.append(file_dir)

from parse_process_output import parse_process_output



def create_processes_object(output):

    # Parse the process output to get a list of dictionaries
    process_objects = parse_process_output(output)

    # Create a list to hold the formatted process data
    formatted_processes = []

    for process in process_objects:
        # Append the current process dictionary to the list
        formatted_processes.append(process)

    # Create a dictionary containing the formatted process data
    data = {"processes": formatted_processes}

    # Convert the data to JSON format
    # json_data = json.dumps(data)

    return data
