class Spring:
    def __init__(self, id, operational_status, group_known):
        self.id = id
        self.operational_status = operational_status
        self.group_known = group_known

class SpringGroup:
    def __init__(self, id, length, found):
        self.id = id
        self.length = length
        self.found = found

class SpringRowRecord:
    def __init__(self, spring_map, damaged_spring_groups_record):
        self.spring_map = spring_map
        self.damaged_spring_groups_record = damaged_spring_groups_record

def parse_input(input_string):
    rows = input_string.strip().split('\n')
    spring_rows = []

    for row in rows:
        spring_data = row.split()

        # Parse spring_map
        spring_map = []
        for i, char in enumerate(spring_data[0]):
            if char == '.':
                spring_map.append(Spring(i, "operational", True))
            elif char == '#':
                spring_map.append(Spring(i, "damaged", False))
            elif char == '?':
                spring_map.append(Spring(i, "unknown", False))

        # Parse damaged_spring_groups_record
        damaged_spring_groups_record = []
        groups = spring_data[1].split(',')
        for i, length_str in enumerate(groups):
            length = int(length_str)
            damaged_spring_groups_record.append(SpringGroup(i, length, False))

        spring_row_record = SpringRowRecord(spring_map, damaged_spring_groups_record)
        spring_rows.append(spring_row_record)

    return spring_rows

def read_input_from_file(filename):
    with open(filename, 'r') as file:
        return file.read()

def assign_spring_group(spring_group, springs):
    spring_group.found = True
    for spring in springs:
        spring.group_known = True
        spring.operational_status = "damaged"

        # Check and set adjacent springs' operational_status
        for adjacent_spring in get_adjacent_springs(spring, springs):
            if adjacent_spring.operational_status == "unknown":
                adjacent_spring.operational_status = "operational"

def get_adjacent_springs(target_spring, springs):
    adjacent_springs = []
    for spring in springs:
        if spring.id == target_spring.id - 1 or spring.id == target_spring.id + 1:
            adjacent_springs.append(spring)
    return adjacent_springs

def find_unambiguous_string_groups(row_record):
    spring_map = row_record.spring_map
    damaged_spring_groups_record = row_record.damaged_spring_groups_record

    while any(not spring.group_known for spring in spring_map):
        for group in damaged_spring_groups_record:
            if not group.found:
                potential_sequences = find_potential_sequences(group.length, spring_map)

                for sequence in potential_sequences:
                    assign_spring_group(group, sequence)
                    break  # Only assign to the first valid sequence

def find_potential_sequences(length, spring_map):
    potential_sequences = []
    current_sequence = []

    for spring in spring_map:
        if spring.operational_status == "damaged":
            current_sequence.append(spring)
        elif spring.operational_status == "unknown":
            current_sequence.append(spring)
            if len(current_sequence) == length:
                potential_sequences.append(current_sequence)
                current_sequence = []
        else:
            current_sequence = []

    return potential_sequences

def find_number_of_possible_arrangements(row_record):
    spring_map = row_record.spring_map
    damaged_spring_groups_record = row_record.damaged_spring_groups_record

    placed_groups = [False] * len(damaged_spring_groups_record)
    possible_arrangements = 0

    while True:
        place_group_index = find_unplaced_group(placed_groups)
        if place_group_index is None:
            break  # All groups placed, exit loop

        placed_groups[place_group_index] = True
        possible_arrangements += 1

        # Place the group and check for additional arrangements
        while place_group_index > 0 and placed_groups[place_group_index - 1]:
            place_group_index -= 1
            possible_arrangements += 1

        # Unplace the group
        placed_groups[place_group_index] = False

        # Check if the group can be placed in the next sequence
        if place_group_index < len(damaged_spring_groups_record) - 1:
            placed_groups[place_group_index + 1] = True

    return possible_arrangements

def find_unplaced_group(placed_groups):
    for i, placed in enumerate(placed_groups):
        if not placed:
            return i
    return None

def main():
    possible_arrangements = 0

    file_input = read_input_from_file("testInput.dat")
    parsed_rows = parse_input(file_input)

    while True:
        for row_record in parsed_rows:
            find_unambiguous_string_groups(row_record)

        # Check if any changes occurred in the springs' found status
        if any(not spring.group_known for row_record in parsed_rows for spring in row_record.spring_map):
            continue

        break

    # Find the number of possible arrangements after all unambiguous strings are found
    for row_record in parsed_rows:
        possible_arrangements += find_number_of_possible_arrangements(row_record)

    print(f"Part 1: The number of possible arrangements is {possible_arrangements}")
    return possible_arrangements

if __name__ == "__main__":
    main()
