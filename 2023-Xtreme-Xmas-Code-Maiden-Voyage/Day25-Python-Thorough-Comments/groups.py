from component import get_component_by_id
from list_includes import list_includes_string

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
            current_component_id = to_visit.pop(0)
            current_component = get_component_by_id(current_component_id, components)
            if current_component is None:
                raise KeyError("Current component", current_component_id, "not found")
            for connected_component_id in current_component.connected_components:
                if not list_includes_string(group, connected_component_id):
                    group.append(connected_component_id)
                    if not list_includes_string(to_visit, connected_component_id):
                        to_visit.append(connected_component_id)
