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
    box_data, items_list = input_string.strip().split()

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

    return BoxAndItemsRecord(box_sections, items)

def place_item(item, box, sequence):
    item.placement_status = "placed"
    for box_section in sequence:
        box_section.contains = item.id

def unplace_item(item, box, sequence):
    item.placement_status = "unplaced"
    for box_section in sequence:
        if box_section.originally_unknown:
            box_section.contains = "unknown"
        else:
            box_section.contains = "empty"

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
        if box_section.contains == "empty" or box_section.contains == "unknown":
            current_sequence.append(box_section)

            if len(current_sequence) == length:
                potential_sequences.append(current_sequence)
                break  # Add only the first potential sequence
        else:
            current_sequence = []

    return potential_sequences

def place_items_in_unambiguous_placements(record, total_arrangements):
    box = record.box
    items = record.items

    unplaced_items = [item for item in items if item.placement_status == "unplaced"]
    if not unplaced_items:
        total_arrangements[0] += 1
        return

    selected_item = unplaced_items[0]

    potential_sequences = find_potential_sequences(selected_item.length, box)

    for sequence in potential_sequences:
        place_item(selected_item, box, sequence)
        place_items_in_unambiguous_placements(record, total_arrangements)
        unplace_item(selected_item, box, sequence)

def main(input_string):
    total_number_of_possible_arrangements = [0]

    record = parse_input(input_string)

    place_items_in_unambiguous_placements(record, total_number_of_possible_arrangements)

    print(f"Total number of possible arrangements is {total_number_of_possible_arrangements[0]}")
    return total_number_of_possible_arrangements[0]

if __name__ == "__main__":
    input_string = "???.### 1,1,3"
    main(input_string)
