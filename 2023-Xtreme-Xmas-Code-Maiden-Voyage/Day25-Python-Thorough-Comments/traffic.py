from random import choice as random_choice
from component import get_component_by_id
from connection import get_connection_by_component_ids

def simulate_traffic(components, connections):
    
    # Simulate random paths until the 3rd hottest component has a heat value 
    #   that is both greater than 10 and at least double the heat value of 
    #   the 4th hottest component
    while connections[2].heat <= 2 * connections[3].heat or connections[2].heat <= 10:
        # Simulate a random path
        simulate_random_traffic_path(components, connections)

        # I was going to use a to reduce sorting, but I'm not that familiar with 
        #   heaps in python and my preliminary testing yielded errors when using 
        #   duplicate priority values, so we'll just sort by heat for now
        connections.sort(key=lambda connection: connection.heat, reverse=True)

     
def simulate_random_traffic_path(components, connections):
    # Randomly choose starting and ending components
    component_start = random_choice(components)
    component_end = random_choice(components)

    # If the starting and ending components are the same, choose a new ending
    while component_start == component_end:
        component_end = random_choice(components)

    # Find a path from the starting component to the ending component
    path = find_path(component_start, component_end, components)

    # Increment the heat of each component in the path
    for component in path:
        if component.previous is not None:
            connection = get_connection_by_component_ids(component.id, component.previous.id, connections)
            if connection is None:
                print("Connection between", component.id, "and", component.previous.id, "not found")
            else:
                connection.heat += 1

def find_path(component_start, component_end, components):
    # Initialize the list of visited components
    visited = []

    # Initialize the list of unvisited components
    unvisited = []

    # Set the distance of the starting component to 0
    component_start.distance = 0

    # Add the starting component to the list of unvisited components
    unvisited.append(component_start)

    # This is based on Dijsktra's algorithm because I'm comfortable with it, but I 
    #   don't actually care about finding the shortest path, just any path, so it 
    #   terminates after finding the first path
    path_found = False
    while not path_found:
        # Sort the unvisited components by distance
        unvisited.sort(key=lambda component: component.distance)

        # Get the component with the smallest distance
        current_component = unvisited.pop(0)

        # Add the current component to the list of visited components
        visited.append(current_component)

        # If the current component is the ending component, set path_found to 
        #   True and break
        if current_component == component_end:
            path_found = True
            break

        # For each connection of the current component
        for component_id in current_component.connected_components:
            # Get the connected component
            connected_component = get_component_by_id(component_id, components)

            if connected_component is None:
                print("Connected component", component_id, "not found")
            # If the connected component is not in the list of visited components
            elif connected_component not in visited:
                # Calculate the new distance
                new_distance = current_component.distance + 1

                # If the new distance is less than the connected component's distance
                if new_distance < connected_component.distance:
                    # Update the connected component's distance
                    connected_component.distance = new_distance

                    # Update the connected component's previous component
                    connected_component.previous = current_component

                    # Add the connected component to the list of unvisited components
                    unvisited.append(connected_component)

    # Initialize the list of connections in the path
    path = []

    # Get the path from the ending component to the starting component
    current_component = component_end
    while current_component is not None:
        path.insert(0, current_component)
        current_component = current_component.previous

    # Return the path
    return path
