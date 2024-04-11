# A Connection will be an object with the following properties: component1 (a 
#   Component object), component2 (a different Component object), and heat (an 
#   integer initially set to 0)
class Connection:
        # Initialize the Connection object
        def __init__(self, component1: str, component2: str):
            self.component1 = component1
            self.component2 = component2
            self.heat = 0
    
        # Return a string representation of the Connection object for printing
        def __str__(self):
            return f"Connection between {self.component1} and {self.component2} with heat {self.heat}"
    
        # Return a string representation of the Connection object for debugging
        def __repr__(self):
            return f"Connection between {self.component1} and {self.component2} with heat {self.heat}"
    
        # Add equality comparison method
        def __eq__(self, other):
            if not isinstance(other, Connection):
                return False
            return (self.component1 == other.component1 and self.component2 == other.component2) or (self.component1 == other.component2 and self.component2 == other.component1)
    
        # Add hash method
        def __hash__(self):
            return hash(self.component1) ^ hash(self.component2)

def get_connection_by_component_ids(component1_id: str, component2_id: str, connections: list[Connection]) -> Connection | None:
    for connection in connections:
        if connection.component1 == component1_id and connection.component2 == component2_id:
            return connection
        if connection.component1 == component2_id and connection.component2 == component1_id:
            return connection
    return None
