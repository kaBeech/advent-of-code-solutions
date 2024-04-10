# A Component will be an object with the following properties: id (a 
#   3-character string), connections (a list of other Component ids), and heat 
#   (an integer initially set to 0)
class Component:

    # Initialize the Component object
    def __init__(self, id: str, connections: list):
        self.id = id
        self.connections = connections
        self.heat = 0

    # Return a string representation of the Component object for printing
    def __str__(self):
        return f"Component {self.id} with connections {self.connections} and heat {self.heat}"

    # Return a string representation of the Component object for debugging
    def __repr__(self):
        return f"Component {self.id} with connections {self.connections} and heat {self.heat}"

    # Add equality comparison method
    def __eq__(self, other):
        if not isinstance(other, Component):
            return False
        return self.id == other.id

    # Add hash method
    def __hash__(self):
        return hash(self.id)

# Take the input file location as a string and return a list of Components
# Assume the input consists of lines of the form "cid: con ect ion" where "cid" 
#   is an id (a 3-character string), and everything after the colon 
#   ("con ect ion") is a space-separated list of ids of other Components that 
#   this Component is connected to
# For example, the input line "jqt: rhn xhk nvd" would create a Component with 
#   id "jqt", connections ["rhn", "xhk", "nvd"], and heat 0
def parse_input(file_location: str):
    # Initialize the list of Components
    components = []

    # Open the file
    file = open(file_location)

    # Read the file into a list of raw component strings
    components_raw = file.read().split("\n")

    # Close the file
    file.close()

    # For each raw component string, create a Component object and add it to 
    #   the list of Components
    for component_raw in components_raw:
        
        # Skip empty lines
        if component_raw == "":
            continue

        # Split the raw component string into an id and a list of connections
        id, connections = component_raw.split(": ")

        # Create a Component object and add it to the list of Components
        components.append(Component(id, connections.split(" ")))
   
    # Since the input only list unidirectional connections, add the reverse
    #   connections to each Component
    # Since we know that the input is perfectly formatted and there are no 
    #   duplicate ids, we can use this method: for each component, for each 
    #   connection, find the component with that connnection id and add the 
    #   current component's id to its list of connections
    # This is O(n^2) but we only have to do it once and the input is small-ish 
    #   so I'm okay with it
    for component in components:
        for connection in component.connections:
            for other_component in components:
                if other_component.id == connection:
                    other_component.connections.append(component.id)
                    break

    print(components)

    # Return the list of Components
    return components

