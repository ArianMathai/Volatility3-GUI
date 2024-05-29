def parse_process_output(output):
    # We split the output into lines based on the end of the line character '\n'
    lines = output.strip().split('\n')
    # Get the headers by splitting the third line (We have to check if this is standard of all plugins)
    headers = lines[2].split()
    # Initialize a list to hold the process entries
    processes = []
    # Iterate over the lines starting from the fourth line, since headers are third
    for line in lines[3:]:
        # Split the line by whitespace
        values = line.split()
        # Skip empty lines
        if not values:
            continue
        # Zip the headers and values together into a dictionary
        process_entry = dict(zip(headers, values))
        # Append the process entry to the list
        processes.append(process_entry)

    # return what's now a list of objects, each object being a process.
    return processes