%% Advent of Code 2024, Day 8, in Prolog

% Solve Part 1
solve :-
    read_file('test_input.dat', CharList),
    writeln(CharList).  % Display the result for verification

% Read file and convert to list of char(Char, X, Y)
% For example, an input file containing this data:
% ...0
% A.0.
% ..AA
% ....
%
% ..will output this AntennaMap like this:
% [char(.,0,0),char(.,1,0),char(.,2,0),char(0,3,0),char(A,0,1),char(.,1,1),char(0,2,1),char(.,3,1),char(.,0,2),char(.,1,2),char(A,2,2),char(A,3,2),char(.,0,3),char(.,1,3),char(.,2,3),char(.,3,3)]
read_file(Filename, CharList) :-
    open(Filename, read, Stream),
    read_lines(Stream, 0, CharList),
    close(Stream).

% Read lines until end of file, accumulating characters with coordinates
read_lines(Stream, Y, CharList) :-
    read_line_to_string(Stream, Line),
    (Line \= end_of_file
        -> (string_chars(Line, Chars),
            process_line(Chars, 0, Y, ThisLineChars),
            Y1 is Y + 1,
            read_lines(Stream, Y1, RestChars),
            append(ThisLineChars, RestChars, CharList))
        ; CharList = []).

% Process each character in a line, recording its coordinates
process_line([], _, _, []).
process_line([Char|Rest], X, Y, [char(Char, X, Y)|RestChars]) :-
    X1 is X + 1,
    process_line(Rest, X1, Y, RestChars).

