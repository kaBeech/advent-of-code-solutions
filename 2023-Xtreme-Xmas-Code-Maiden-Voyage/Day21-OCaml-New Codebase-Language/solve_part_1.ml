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

let solve_part_1 str x y =
  let rec solve_part_1' str x y i acc =
    if i = String.length str then acc
    else if str.[i] = '\n' then solve_part_1' str (-64) (y - 1) (i + 1) acc
    else if str.[i] = '.' && abs x + abs y <= 64 && (abs x + abs y) mod 2 == 0 then solve_part_1' str (x + 1) y (i + 1) (acc + 1)
    else solve_part_1' str (x + 1) y (i + 1) acc
  in
  solve_part_1' str x y 0 0;;

let solution_part_1 = solve_part_1 input_challenge (-64) 64;;

print_string "Part 1: the Elf could reach ";
  print_string (string_of_int solution_part_1);
  print_endline " garden plots in 64 steps";;
