import re

def parse_process_output(output):
    try:
        # Decode the output to ensure it's in UTF-8
        output = output.decode('utf-8')
    except AttributeError:
        # If output is already a string (Python 3), this will raise an AttributeError
        pass
    except UnicodeDecodeError as e:
        print(f"UnicodeDecodeError: {e}")
        # Handle the decoding error if necessary
        return []

    # Split the output into lines
    lines = output.strip().split('\n')
    print(f"Lines: {lines}")

    # Identify the start index for the headers (after the "Volatility 3 Framework" line and a blank line)
    start_idx = 0
    for i in range(len(lines)):
        print(f"Checking line {i}: {lines[i]}")
        if "Volatility 3 Framework" in lines[i]:
            print(f"Found 'Volatility 3 Framework' at line {i}")
            # Locate the first non-empty line after the framework line
            while not lines[i + 1].strip():
                i += 1
                print(f"Skipping empty line {i + 1}")
            start_idx = i + 1
            print(f"Header start index identified at {start_idx}")
            break

    # Extract the headers from the identified start index
    headers = lines[start_idx].strip().split('\t')
    print(f"Headers: {headers}")

    # Initialize a list to hold the process entries
    processes = []

    # Iterate over the lines starting from the next line after headers
    for line in lines[start_idx + 1:]:
        print(f"Processing line: {line}")
        # Skip empty lines
        if not line.strip():
            print("Skipping empty line")
            continue

        # Get the values for the current process
        values = line.strip().split('\t')
        print(f"Values: {values}")

        # Initialize a dictionary for the current process
        process_entry = dict(zip(headers, values))
        print(f"Process entry: {process_entry}")

        # Append the process entry to the list
        processes.append(process_entry)

    # Return the list of process dictionaries
    print(f"Final processes list: {processes}")
    return processes





def parse_malfind_output(output):
    # Split the output into lines
    lines = output.strip().split('\n')

    # Find the start index for the headers (after the "Volatility 3 Framework 2.7.0" line and a blank line)
    start_idx = 0
    for i in range(len(lines)):
        if "Volatility 3 Framework 2.7.0" in lines[i]:
            start_idx = i + 2
            break

    # Extract the headers from the line after the identified start index
    headers = lines[start_idx].split('\t')
    print("Headers:", headers)

    # Initialize a list to hold the process entries
    processes = []
    amount_of_hexdumps = 0

    # Iterate over the lines starting from the next line after headers
    i = start_idx + 1
    while i < len(lines):
        amount_of_newlines = len(lines)

        # Initialize a dictionary for the current process
        process_entry = {}

        # Get the values for the current process
        values = lines[i].split('\t')
        amount_of_tabs = len(lines[i].split('\t'))
        print(values)

        # Skip empty lines
        if not lines[i].strip():
            print("Skipping empty line:", lines[i])
            i += 1
            continue

        # Populate the process entry with values
        for header, value in zip(headers, values):
            process_entry[header] = value

        # Handle Hexdump field
        if "Hexdump" in process_entry:
            hexdump_lines = [process_entry["Hexdump"]]

            i += 1

            # Continue parsing until we find the start of the next process
            current = i
            print("current hexdump startline:", current)
            while i < len(lines):
                print("on line:",i)
                print("amount of tabs:",amount_of_tabs)
                print("amount of hexdumps:", amount_of_hexdumps)
                print("amount of newlines:", amount_of_newlines)
                if lines[i].startswith('\t') or lines[i].startswith(' ') or current % 5 == 0 or current % (5 + (9 * amount_of_hexdumps)) == 0:
                    if i == current + 7:
                        hexdump_lines.append(lines[i].split('\t')[0])
                        hexdump_lines.append(lines[i].split('\t')[1])
                        break
                    hexdump_lines.append(lines[i].lstrip('\t').rstrip('\n'))
                    i += 1
                else:
                    print("Not appending line:", lines[i])  # Print lines that don't meet the condition
                    break

            # Join the hexdump lines and update the process entry
            process_entry["Hexdump"] = '\n'.join(hexdump_lines)
            print("Processed Hexdump:", process_entry["Hexdump"])
            amount_of_hexdumps += 1

        # Handle Disasm field
        disasm_lines = []
        line = lines[i].strip()
        print("yo", line.split('\t')[2])
        disasm_lines.append(line.split('\t')[2])
        process_entry["Disasm"] = '\n'.join(disasm_lines)
        #     if not line or line.startswith((' ', '\t')):
        #         # Skip empty lines or lines starting with whitespace
        #         i += 1
        #         continue
        #     elif any(c.isdigit() or c.isalpha() for c in line):
        #         # Stop parsing if we encounter a new field (starts with a digit or a letter)
        #         break
        #     else:
        #         # Add the line to the Disasm lines
        #         disasm_lines.append(line)
        #         i += 1
        #
        # if disasm_lines:
        #     # Join the disasm lines and update the process entry
        #     process_entry["Disasm"] = '\n'.join(disasm_lines)
        #     print("Processed Disasm:", process_entry["Disasm"])

        # Append the process entry to the list
        processes.append(process_entry)
        print("Processed entry:", process_entry)

        # Move to the next line
        i += 1

    # Return the list of process dictionaries
    return processes


def parse_output(output, plugin):
    # Check if the output contains a "Hexdump" header
    if plugin == "malfind":
        return parse_malfind_output(output)
    else:
        return parse_process_output(output)

# Example usage:
