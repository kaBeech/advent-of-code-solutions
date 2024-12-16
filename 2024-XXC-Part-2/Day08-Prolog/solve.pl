%% Advent of Code 2024, Day 8, in Prolog

solve(InputFilePath) :-
    antenna_map is parse_input(InputFilePath),
    unique_antinode_positions is find_unique_antinode_positions(antenna_map),
    part_1_solution is sum(unique_antinode_positions),
    writeln(part_1_solution: part_1_solution).
