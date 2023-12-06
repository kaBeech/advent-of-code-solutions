def calculate_points_from_file(file_path):
    try:
        # Open the file in read mode
        with open(file_path, 'r') as file:
            # Read the content of the file
            input_string = file.read()

        # Split the input into lines
        lines = input_string.split('\n')

        # Initialize total points
        total_points = 0

        # Process each line
        for line in lines:
            # Remove everything before the colon
            line = line.split(':')[-1].strip()

            # Split the line into winning numbers and my numbers
            winning_numbers = list(map(int, line.split('|')[0].split()))
            my_numbers = list(map(int, line.split('|')[1].split()))

            # Find shared numbers
            shared_numbers = list(set(winning_numbers) & set(my_numbers))

            # Calculate line points
            if len(shared_numbers) > 0:
                line_points = 2 ** (len(shared_numbers) - 1)
            else:
                line_points = 0

            # Add line points to total points
            total_points += line_points

        # Return the total points
        return total_points

    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return None

# Specify the file path
file_path = 'challengeInput.txt'

# Calculate points from the file and print the result
result = calculate_points_from_file(file_path)
if result is not None:
    print(f"Total Points: {result}")
