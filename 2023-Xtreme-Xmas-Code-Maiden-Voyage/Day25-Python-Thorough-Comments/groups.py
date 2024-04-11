from component import get_component_by_id
from component import Component
from connection import Connection

def get_groups(components: list[Component], unplugged_connections: list[Connection]) -> tuple[list[str], list[str]]:
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
                # Skip this component if it's already in a group
                if not connected_component_id in group:
                    group.append(connected_component_id)
                    # Skip this component if it's already in a queue to be visited
                    if not connected_component_id in to_visit:
                        to_visit.append(connected_component_id)

    # print("Group 1:", group1)
    # print("Group 2:", group2)
    return group1, group2
