%% Advent of Code 2024, Day 8, in Prolog

solve() :-
    antenna_map is parse_input(),
    % unique_antinode_positions is find_unique_antinode_positions(antenna_map),
    % part_1_solution is sum(unique_antinode_positions),
    writeln(part_1_solution: antenna_map).

%% Parses an input file containing data like this:
%% ...0
%% A.0.
%% ..AA
%% ....
%%
%% into an AntennaMap like this:
%% [[3, 0, 0], [0, 1, A], [2, 1, 0], [2, 2, A], [3, 2, A]]
%%
%% where each element is a list of [x, y, freq] where x and y are the
%% coordinates of the value in the map and freq is the frequency of the
%% antenna.
parse_input() :-
    open("test_input.dat", read, Str),
    % open("challenge_input.dat", read, Str),
    read_file(Str, Lines),
    close(Str),
    split_string(FileContent, "\n", "\n", Lines),
    maplist(parse_line, Lines, AntennaMap).
