def parse_input(file_location: str):
    with open(file_location) as file:
        connections_raw = file.read().split("\n")
        return connections_raw

