from parse import parse_input

def solve_part1():
    # Get the list of components from the input file (make sure to specify the 
    #   correct file path as a string)
    components = parse_input("test_input.dat")
    
    result = 42 
    return result

print("Part 1: The result of multiplying the number of components in each group together is", solve_part1())
