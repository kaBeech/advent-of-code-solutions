from parse import parse_input
from traffic import simulate_traffic
from unplug import unplug_hottest_connections
from groups import get_groups

# Set the input file location as a string
input_file_location = "test_input.dat"

def solve_part1():
    # We will represent the components as a list of interconnected nodes and 
    #   a list of the connections between them
    # Each Connection will include a heat value that will be incremented each 
    #   time traffic passes through it from one component to another
    components, connections = parse_input(input_file_location)

    # Since we know there exist three connections that, if removed, will split 
    #   the network into two groups, it is likely that these will be the 3 
    #   connections most commonly travelled through when randomly traversing 
    #   the network from one component to another
    # Since this is a fun Advent of Code puzzle, it is also likely that the 
    #   split between the two groups will be obvious. In any case, I'm going 
    #   to take my own advice from Day 20 of this year and try solving an 
    #   easier problem before assuming it's a harder one
    # Therefore we will simulate traffic on that network until 
    #   there becomes an obvious gap between the heat of the 3rd and 4th 
    #   hottest components
    simulate_traffic(components, connections)

    # Make a new list of connections with the 3 hottest 
    #   connections removed
    unplugged_connections = unplug_hottest_connections(connections)
    
    # Traverse the network until all components are visited, adding 
    #   each unvisited component to its corresponding group
    group1, group2 = get_groups(components, unplugged_connections)

    # Multiply the number of components in each group together to 
    #   get the result
    result = len(group1) * len(group2)
    
    # Finally, return the result
    return result

# Print a message showing the solution to Part 1
print("Part 1: The result of multiplying the number of components in each group together is", solve_part1())
