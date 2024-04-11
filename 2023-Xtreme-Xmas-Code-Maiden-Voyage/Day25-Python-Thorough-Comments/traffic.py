from component import Component
from connection import Connection
from traffic_random import simulate_random_traffic_path


def simulate_traffic(components: list[Component], connections: list[Connection]) -> None:
    print("Simulating traffic...")
    
    # Simulate random paths until the hottest connection has a heat value 
    #   that is greater than 10 and the 3rd hottest connection has at least 
    #   1.5 times that of the 4th hottest component
    while connections[0].heat <= 10 or connections[2].heat <= 1.5 * connections[3].heat:

        # Simulate a random path
        simulate_random_traffic_path(components, connections)

        # I was going to use a to reduce sorting, but I'm not that familiar with 
        #   heaps in python and my preliminary testing yielded errors when using 
        #   duplicate priority values, so we'll just sort by heat for now
        connections.sort(key=lambda connection: connection.heat, reverse=True)
    
    print("...Traffic Simulation Complete")
