from connection import Connection
from component import Component
from component import get_component_by_id

def unplug_hottest_connections(connections: list[Connection], components: list[Component]) -> list[Connection]:
    # Sort the connections by heat in descending order
    connections.sort(key=lambda x: x.heat, reverse=True)

    # Record the connections we unplug for use when counting the size of the 
    #   component groups
    unplugged_connections = []
    
    # For each of the 3 hottest connections, for each of their components, 
    #   remove the corresponding component id from its list of 
    #   connected_components
    i = 0
    while i < 3:
        current_connection = connections[i]
        unplugged_connections.append(current_connection)
        component1 = get_component_by_id(current_connection.component1, components)
        component2 = get_component_by_id(current_connection.component2, components)
        if component1 is None or component2 is None:
            raise ValueError(f"Component not found for connection {current_connection}")
        component1.connected_components.remove(component2.id)
        component2.connected_components.remove(component1.id)
        i += 1

    
    return unplugged_connections
