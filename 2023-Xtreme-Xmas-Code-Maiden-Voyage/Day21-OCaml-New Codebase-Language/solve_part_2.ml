let read_file_to_string filename =
  let lines = ref [] in
  let chan = open_in filename in
  try
    while true; do
      lines := input_line chan :: !lines
    done; ""
  with End_of_file ->
    close_in chan;
    String.concat "\n" (List.rev !lines);;

let input_challenge = read_file_to_string "challengeInput.dat";;


(* A black square is a space that can be moved to in an even number of steps *)
(* A red square is a space that can be moved to in an odd number of steps *)
(* The starting position is a black square *)
(* A section is a 131 x 131 grid composed of the challenge input map *)
(* These sections are tiled together to make the complete map *)
(* Just like the red and black squares, a red section is a section that orthagonally borders only black sections, and vice versa *)
(* The starting position is in a black section *)

(*
let count_black_squares_in_red_section str x y =
  let rec count_black_squares_in_red_section' str x y i acc =
    if i = String.length str then acc
    else if str.[i] = '\n' then count_black_squares_in_red_section' str (-64) (y - 1) (i + 1) acc
    else if str.[i] = '.' && abs x + abs y <= 64 && (abs x + abs y) mod 2 == 0 then count_black_squares_in_red_section' str (x + 1) y (i + 1) (acc + 1)
    else count_black_squares_in_red_section' str (x + 1) y (i + 1) acc
  in
  count_black_squares_in_red_section' str x y 0 0;;

let count_black_squares_in_black_section str x y =
  let rec count_black_squares_in_black_section' str x y i acc =
    if i = String.length str then acc
    else if str.[i] = '\n' then count_black_squares_in_black_section' str (-64) (y - 1) (i + 1) acc
    else if str.[i] = '.' && abs x + abs y <= 64 && (abs x + abs y) mod 2 == 0 then count_black_squares_in_black_section' str (x + 1) y (i + 1) (acc + 1)
    else count_black_squares_in_black_section' str (x + 1) y (i + 1) acc
  in
  count_black_squares_in_black_section' str x y 0 0;;
*)

let count_black_tiles_in_black_section_within_diamond str x y =
  let rec count_black_tiles_in_black_section_within_diamond' str x y i acc =
    if i = String.length str then acc
    else if str.[i] = '\n' then count_black_tiles_in_black_section_within_diamond' str (-64) (y - 1) (i + 1) acc
    else if str.[i] = '.' && abs x + abs y <= 64 && (abs x + abs y) mod 2 == 0 then count_black_tiles_in_black_section_within_diamond' str (x + 1) y (i + 1) (acc + 1)
    else count_black_tiles_in_black_section_within_diamond' str (x + 1) y (i + 1) acc
  in
  count_black_tiles_in_black_section_within_diamond' str x y 0 0;;

let black_tiles_in_black_section_within_diamond = count_black_tiles_in_black_section_within_diamond input_challenge (-64) 64;;

print_string "Part 2: the Elf could reach ";
  print_string (string_of_int black_tiles_in_black_section_within_diamond);
  print_endline " garden plots in 26501365 steps";;
