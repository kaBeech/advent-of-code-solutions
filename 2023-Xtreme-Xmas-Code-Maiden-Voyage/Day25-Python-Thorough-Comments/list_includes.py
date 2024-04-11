def list_includes_string(strings: list[str], string: str) -> bool:
    for item in strings:
        if item.strip() == string.strip():
            return True
    return False
