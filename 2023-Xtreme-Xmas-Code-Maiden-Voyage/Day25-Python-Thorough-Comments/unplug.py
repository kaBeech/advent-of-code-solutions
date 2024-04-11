def unplug_hottest_connections(connections, components):
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
        component1 = current_connection.component1
        component2 = current_connection.component2
        component1.connected_components.remove(component2.id)
        component2.connected_components.remove(component1.id)
        i += 1

    
    return unplugged_connections
