from heapq import heappop, heappush

def simulate_traffic(components, connections):
    # Initialze a connections heap so we don't have to sort as much
    connections_by_heat = []
    for connection in connections:
        heappush_by_heat(connections_by_heat, connection)


def heappush_by_heat(heap, connection):
    # Use a negative heat value to make the heap a min-heap
    heappush(heap, (-connection.heat, connection))
