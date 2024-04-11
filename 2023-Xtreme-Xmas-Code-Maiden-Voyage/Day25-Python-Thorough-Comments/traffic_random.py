from component import Component
from connection import Connection
from random import choice as random_choice
from connection import get_connection_by_component_ids
from path import find_path

def simulate_random_traffic_path(components: list[Component], connections: list[Connection]) -> None:
    # Randomly choose starting and ending components
    component_start_id = random_choice(components).id
    component_end_id = random_choice(components).id

    # If the starting and ending components are the same, choose a new ending
    while component_start_id == component_end_id:
        component_end_id = random_choice(components).id

    # Find a path from the starting component to the ending component
    path = find_path(component_start_id, component_end_id, components, connections)

    # Increment the heat of each component in the path
    for component in path:
        if component.previous is not None:
            connection = get_connection_by_component_ids(component.id, component.previous, connections)
            if connection is None:
                raise ReferenceError("Connection between", component.id, "and", component.previous, "not found", connections)
            else:
                connection.heat += 1
