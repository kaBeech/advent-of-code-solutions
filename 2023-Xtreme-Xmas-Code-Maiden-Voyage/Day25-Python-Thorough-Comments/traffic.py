from random import choice as random_choice

def simulate_traffic(components, connections):
    # I was going to use a to reduce sorting, but I'm not that familiar with 
    #   heaps in python and my preliminary testing yielded errors when using 
    #   duplicate priority values, so we'll just sort for now
    
    # Simulate random paths until the 3rd hottest component has a heat value 
    #   that is both greater than 10 and at least double the heat value of 
    #   the 4th hottest component
    while connections[2].heat <= 2 * connections[3].heat or connections[2].heat <= 10:
        # Simulate a random path
        simulate_random_traffic_path(components, connections)

        # Sort the connections by heat
        connections.sort(key=lambda connection: connection.heat, reverse=True)

     
def simulate_random_traffic_path(components, connections):
    # Randomly choose starting and ending components
    component_start = random_choice(components)
    component_end = random_choice(components)

    # If the starting and ending components are the same, choose a new ending
    while component_start == component_end:
        component_end = random_choice(components)

    # Find a path from the starting component to the ending component
    path = find_path(component_start, component_end, connections)

    # Increment the heat of each connection in the path
    for connection in path:
        connection.heat += 1

