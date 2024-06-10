import json
import os
import sys

file_dir = os.path.dirname(__file__)
sys.path.append(file_dir)

from parse_process_output import parse_process_output, parse_output


def create_processes_object(output):
    # Parse the process output to get a list of dictionaries
    process_objects = parse_output(output)

    # Create a dictionary containing the formatted process data
    data = {"processes": process_objects}

    return data
