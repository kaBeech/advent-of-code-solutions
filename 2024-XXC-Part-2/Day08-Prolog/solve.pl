%% Advent of Code 2024, Day 8, in Prolog

% Solve Part 1
solve :-
    read_file('test_input.dat', AntennaMap),
    get_nodes(AntennaMap, Nodes),
    writeln(Nodes).

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

% Get nodes from antenna pairs (unique by coordinates)
get_nodes(AntennaMap, UniqueNodes) :-
    group_by_frequency(AntennaMap, GroupedAntennas),
    findall(Node, 
        (member(FreqGroup, GroupedAntennas),
         antenna_pair_to_nodes(FreqGroup, Node)),
        AllNodes),
    remove_duplicate_nodes(AllNodes, UniqueNodes).

% Remove duplicate nodes (nodes with same coordinates)
remove_duplicate_nodes([], []).
remove_duplicate_nodes([Node|Rest], UniqueNodes) :-
    Node = node(X, Y),
    member(node(X, Y), Rest), !,  % If node with same coordinates exists in rest
    remove_duplicate_nodes(Rest, UniqueNodes).
remove_duplicate_nodes([Node|Rest], [Node|UniqueNodes]) :-
    remove_duplicate_nodes(Rest, UniqueNodes).

% Group antennas by their frequency
group_by_frequency([], []).
group_by_frequency([char(Freq,X,Y)|Rest], GroupedResult) :-
    group_by_frequency(Rest, GroupedRest),
    add_to_frequency_group(char(Freq,X,Y), GroupedRest, GroupedResult).

% Add antenna to its frequency group
add_to_frequency_group(char(Freq,X,Y), [], [[char(Freq,X,Y)]]).
add_to_frequency_group(char(Freq,X,Y), [Group|Rest], [NewGroup|Rest]) :-
    Group = [char(Freq,_,_)|_],
    append(Group, [char(Freq,X,Y)], NewGroup).
add_to_frequency_group(char(Freq,X,Y), [Group|Rest], [Group|NewRest]) :-
    Group = [char(OtherFreq,_,_)|_],
    Freq \= OtherFreq,
    add_to_frequency_group(char(Freq,X,Y), Rest, NewRest).

% Generate nodes from a group of same-frequency antennas
antenna_pair_to_nodes(Group, node(NodeX, NodeY)) :-
    length(Group, Len),
    Len > 1,
    member(char(_,X1,Y1), Group),
    member(char(_,X2,Y2), Group),
    X1 @< X2,  % Ensure we don't process the same pair twice
    (
        % Calculate first node
        DiffX is X2 - X1,
        DiffY is Y2 - Y1,
        NodeX is X2 + DiffX,
        NodeY is Y2 + DiffY
    ;
        % Calculate second node
        DiffX is X2 - X1,
        DiffY is Y2 - Y1,
        NodeX is X1 - DiffX,
        NodeY is Y1 - DiffY
    ).
