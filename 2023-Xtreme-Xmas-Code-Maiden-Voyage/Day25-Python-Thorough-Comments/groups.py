from component import get_component_by_id

def get_groups(components, unplugged_connections):
    # Add the components from one of the unplugged connections to initialize 
    #  the groups`
    group1 = [unplugged_connections[0].component1]
    group2 = [unplugged_connections[0].component2]
    
    # For each group, traverse the network until all components are visited, 
    #  adding each unvisited component to its corresponding group
    groups = [group1, group2]
    for group in groups:
        to_visit = [group[0]]
        while to_visit:
            current_component = to_visit.pop(0)
            for component_id in current_component.connected_components:
                connected_component = get_component_by_id(component_id, components)
                if connected_component not in group:
                    group.append(connected_component)
                    to_visit.append(connected_component)
