from component import Component
from connection import Connection
from component import get_component_by_id

# Take the input file location as a string and return a list of Components
#   and a list of Connections
# Assume the input consists of lines of the form "cid: con ect ion" where "cid" 
#   is an id (a 3-character string), and everything after the colon 
#   ("con ect ion") is a space-separated list of ids of other Components that 
#   this Component is connected to
# For example, the input line "jqt: rhn xhk nvd" would create a Component with 
#   id "jqt", connections ["rhn", "xhk", "nvd"], and heat 0
def parse_input(file_location: str):
    # Open the file
    file = open(file_location)

    # Read the file into a list of raw component strings
    components_raw = file.read().split("\n")

    # Close the file
    file.close()

    # Initialize the lists of Components and Connections
    components = []
    connections = []

    # For each raw component string, create a Component object and add it to 
    #   the list of Components
    for component_raw in components_raw:
        
        # Skip empty lines
        if component_raw == "":
            continue

        # Split the raw component string into an id and a list of connections
        id, connections_raw = component_raw.split(": ")

        # Create a Component object and add it to the list of Components
        components.append(Component(id, connections_raw.split(" ")))
    
    # For each pair of Components in the list of Components, create a Connection
    # Since the input only list unidirectional connections, also add the 
    #   reverse connections to each Component
    # If there is no Component with the id of the connected component, create 
    #   one
    # Since we know that the input is perfectly formatted and there are no 
    #   duplicate ids, we can use this method: for each component, for each 
    #   connection, find the component with that connected component's id and 
    #   add the current component's id to its list of connections. Then create 
    #   a Connection object and add it to the list of Connections
    # This is O(n^2) but we only have to do it once and the input is small-ish 
    #   so I'm okay with it
    for component in components:
        for component_id in component.connected_components:
            connected_component = get_component_by_id(component_id, components)
            if connected_component is None:
                connected_component = Component(component_id, [])
                components.append(connected_component)
            connected_component.connected_components.append(component.id)
            connections.append(Connection(component, connected_component.id))

    print(components)

    # Return the lists of Components and Connections
    return components, connections

