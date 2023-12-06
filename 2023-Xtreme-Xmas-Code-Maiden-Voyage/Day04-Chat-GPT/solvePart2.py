def process_input_from_file(filename="challengeInput.txt"):
    # Read input from file
    with open(filename, 'r') as file:
        input_str = file.read()

    # Split input into lines
    lines = input_str.strip().split('\n')

    # Declare arrays
    scratchcards = []
    bonus_scratchcards = []

    for line in lines:
        # Parse line
        parts = line.split(':')
        scratchcard_id = int(parts[0])

        # Extract winning_numbers and my_numbers
        winning_numbers = list(map(int, parts[1].split('|')[0].split()))
        my_numbers = list(map(int, parts[1].split('|')[1].split()))

        # Create scratchcard
        scratchcard = {'id': scratchcard_id, 'shared_numbers': 0,
                       'winning_numbers': winning_numbers, 'my_numbers': my_numbers}
        scratchcards.append(scratchcard)

    # Process scratchcards
    for scratchcard in scratchcards:
        for i in range(scratchcard['shared_numbers']):
            # Add copies of scratchcards with the same id
            new_scratchcard = scratchcards[scratchcard['id'] - 1].copy()
            scratchcards.append(new_scratchcard)

    # Return the total number of scratchcards
    return len(scratchcards)


# Call the function to process input from the file
result = process_input_from_file()
print(result)
