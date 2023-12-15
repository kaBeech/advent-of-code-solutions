class BoxSection:
    def __init__(self, id, contains, originally_unknown):
        self.id = id
        self.contains = contains
        self.originally_unknown = originally_unknown

class Item:
    def __init__(self, id, length, placement_status):
        self.id = id
        self.length = length
        self.placement_status = placement_status

class BoxAndItemsRecord:
    def __init__(self, box, items):
        self.box = box
        self.items = items

def parse_input(input_string):
    rows = input_string.strip().split('\n')
    box_and_items_records = []

    for row in rows:
        box_data, items_list = row.split()

        # Parse box
        box_sections = []
        for i, char in enumerate(box_data):
            if char == '.':
                box_sections.append(BoxSection(i, "buffer material", False))
            elif char == '#':
                box_sections.append(BoxSection(i, "empty", False))
            elif char == '?':
                box_sections.append(BoxSection(i, "unknown", True))

        # Parse items
        items_data = items_list.split(',')
        items = [Item(i, int(length), "unplaced") for i, length in enumerate(items_data)]

        box_and_items_record = BoxAndItemsRecord(box_sections, items)
        box_and_items_records.append(box_and_items_record)

    return box_and_items_records

def read_input_from_file(filename):
    with open(filename, 'r') as file:
        return file.read()

def place_item_permanently(item, box, sequence):
    item.placement_status = "permanently placed"
    for box_section in sequence:
        box_section.contains = item.id

    for adjacent_section in get_adjacent_sections(sequence, box):
        if adjacent_section.contains == "unknown":
            adjacent_section.contains = "buffer material"

def place_item_temporarily(item, box, sequence):
    item.placement_status = "temporarily placed"
    for box_section in sequence:
        box_section.contains = item.id

    for adjacent_section in get_adjacent_sections(sequence, box):
        if adjacent_section.contains == "unknown":
            adjacent_section.contains = "buffer material"

def unplace_temporarily_placed_item(item, box, sequence):
    item.placement_status = "unplaced"
    for box_section in sequence:
        if box_section.originally_unknown:
            box_section.contains = "unknown"
        else:
            box_section.contains = "empty"

    for adjacent_section in get_adjacent_sections(sequence, box):
        if adjacent_section.originally_unknown:
            adjacent_section.contains = "unknown"

def get_adjacent_sections(sequence, box):
    adjacent_sections = []
    for box_section in sequence:
        left_adjacent = box_section.id - 1
        right_adjacent = box_section.id + 1

        if left_adjacent >= 0:
            adjacent_sections.append(box[left_adjacent])

        if right_adjacent < len(box):
            adjacent_sections.append(box[right_adjacent])

    return adjacent_sections

def find_potential_sequences(length, box):
    potential_sequences = []
    current_sequence = []

    for box_section in box:
        for box_section in box:
            if box_section.contains == "empty" or box_section.contains == "unknown":
                current_sequence.append(box_section)

                if len(current_sequence) == length:
                    potential_sequences.append(current_sequence)
                    break  # Add only the first potential sequence
            else:
                current_sequence = []

    return potential_sequences

def place_items_in_unambiguous_placements(record):
    box = record.box
    items = record.items

    while True:
        unplaced_items = [item for item in items if item.placement_status == "unplaced"]
        if not unplaced_items:
            break

        selected_item = max(unplaced_items, key=lambda x: x.length)

        potential_sequences = find_potential_sequences(selected_item.length, box)

        if len(potential_sequences) == 1:
            place_item_permanently(selected_item, box, potential_sequences[0])
        elif len(potential_sequences) > 1:
            same_length_items = [item for item in items if item.length == selected_item.length and item.placement_status == "unplaced"]

            if len(potential_sequences) == len(same_length_items):
                for item, sequence in zip(same_length_items, potential_sequences):
                    place_item_permanently(item, box, sequence)

    return record

def find_number_of_possible_arrangements(record):
    box = record.box
    items = record.items

    number_of_possible_arrangements = 0

    if all(item.placement_status == "permanently placed" for item in items):
        return 1

    for item in items:
        if item.placement_status == "unplaced":
            temporarily_place_item(item, box)
            number_of_possible_arrangements += find_number_of_possible_arrangements(record)
            unplace_temporarily_placed_item(item, box)

    return number_of_possible_arrangements

def main():
    total_number_of_possible_arrangements = 0

    file_input = read_input_from_file("testInput.dat")
    parsed_records = parse_input(file_input)

    for record in parsed_records:
        place_items_in_unambiguous_placements(record)
        total_number_of_possible_arrangements += find_number_of_possible_arrangements(record)

    print(f"Part 1: The number of possible arrangements is {total_number_of_possible_arrangements}")
    return total_number_of_possible_arrangements

if __name__ == "__main__":
    main()
