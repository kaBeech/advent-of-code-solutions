# A Component will be an object with the following properties: id (a 
#   3-character string), connected_components (a list of other Component ids), 
#   distance (an integer initially set to infinity, for Dijkstra-based 
#   algorithms), and previous (a Component id initially set to None, for 
#   pathing)
class Component:
    # Initialize the Component object
    def __init__(self, id: str, connected_components: list):
        self.id = id
        self.connected_components = connected_components
        self.distance = int("inf")
        self.previous = None

    # Return a string representation of the Component object for printing
    def __str__(self):
        return f"Component {self.id} with connections {self.connected_components}"

    # Return a string representation of the Component object for debugging
    def __repr__(self):
        return f"Component {self.id} with connections {self.connected_components}"

    # Add equality comparison method
    def __eq__(self, other):
        if not isinstance(other, Component):
            return False
        return self.id == other.id

    # Add hash method
    def __hash__(self):
        return hash(self.id)

def get_component_by_id(component_id: str, components: list[Component]) -> Component | None:
    for component in components:
        if component.id == component_id:
            return component
    return None
