def get_component_by_id(component_id: str, components: List[Component]) -> Component:
    for component in components:
        if component.id == component_id:
            return component
    return None
