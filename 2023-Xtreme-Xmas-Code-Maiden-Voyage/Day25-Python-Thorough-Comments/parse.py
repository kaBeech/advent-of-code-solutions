# A Connection will be an object with the following properties: component1 (a 
#   Component object), component2 (a different Component object), and heat (an 
#   integer initially set to 0)
class Connection:
        # Initialize the Connection object
        def __init__(self, component1: Component, component2: Component):
            self.component1 = component1
            self.component2 = component2
            self.heat = 0
    
        # Return a string representation of the Connection object for printing
        def __str__(self):
            return f"Connection between {self.component1.id} and {self.component2.id} with heat {self.heat}"
    
        # Return a string representation of the Connection object for debugging
        def __repr__(self):
            return f"Connection between {self.component1.id} and {self.component2.id} with heat {self.heat}"
    
        # Add equality comparison method
        def __eq__(self, other):
            if not isinstance(other, Connection):
                return False
            return (self.component1 == other.component1 and self.component2 == other.component2) or (self.component1 == other.component2 and self.component2 == other.component1)
    
        # Add hash method
        def __hash__(self):
            return hash(self.component1) ^ hash(self.component2)


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
    # Since we know that the input is perfectly formatted and there are no 
    #   duplicate ids, we can use this method: for each component, for each 
    #   connection, find the component with that connected component's id and 
    #   add the current component's id to its list of connections. Then create 
    #   a Connection object and add it to the list of Connections
    # This is O(n^2) but we only have to do it once and the input is small-ish 
    #   so I'm okay with it
    for component in components:
        for connection in component.connections:
            for connected_component in components:
                if connected_component.id == connection:
                    connected_component.connections.append(component.id)
                    connections.append(Connection(component, connected_component))
                    break

    print(components)

    # Return the list of Components
    return components

