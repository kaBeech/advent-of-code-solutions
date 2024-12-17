%% Advent of Code 2024, Day 8, in Prolog

% Solve Part 1
solve :-
    read_file('test_input.dat', AntennaMap),
    writeln(AntennaMap).

% Read file and convert to list of char(Char, X, Y)
% For example, an input file containing this data:
% ...0
% A.0.
% ..AA
% ....
%
% ..will output this AntennaMap like this:
% [char(0,8,1),char(0,5,2),char(0,7,3),char(0,4,4),char(A,6,5),char(A,8,8),char(A,9,9)]
read_file(Filename, AntennaMap) :-
    open(Filename, read, Stream),
    read_lines(Stream, 0, AntennaMap),
    close(Stream).

% Read lines until end of file, accumulating characters with coordinates
read_lines(Stream, Y, AntennaMap) :-
    read_line_to_string(Stream, Line),
    (Line \= end_of_file
        -> (string_chars(Line, Chars),
            process_line(Chars, 0, Y, ThisLineChars),
            Y1 is Y + 1,
            read_lines(Stream, Y1, RestChars),
            append(ThisLineChars, RestChars, AntennaMap))
        ; AntennaMap = []).

% Process each character in a line (except '.' characters), 
% recording its coordinates
process_line([], _, _, []).
process_line(['.'|Rest], X, Y, RestChars) :-  
    X1 is X + 1,
    process_line(Rest, X1, Y, RestChars).
process_line([Char|Rest], X, Y, [char(Char, X, Y)|RestChars]) :-
    Char \= '.',
    X1 is X + 1,
    process_line(Rest, X1, Y, RestChars).

