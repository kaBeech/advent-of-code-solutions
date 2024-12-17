%% Advent of Code 2024, Day 8, in Prolog

% Solve Part 1
solve :-
    read_file('test_input.dat').

% Read and display contents of a file
read_file(Filename) :-
    open(Filename, read, Stream),
    read_lines(Stream),
    close(Stream).

% Helper predicate to read lines until end of file
read_lines(Stream) :-
    read_line_to_string(Stream, Line),
    (Line \= end_of_file
        -> (writeln(Line),
            read_lines(Stream))
        ; true).

