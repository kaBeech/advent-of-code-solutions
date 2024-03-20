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

(* Might need to change that 64 to 65 to reflect the new number of steps *)
(* For tile_color and section_color, use 'r' for red and 'b' for black *)
let count_colored_tiles_in_colored_section section_map x y tile_color section_color only_within_diamond only_outside_diamond =
  let rec count_colored_tiles_in_colored_section' section_map x y tile_color section_color only_within_diamond only_outside_diamond i acc =
    if i = String.length section_map then acc
    else if section_map.[i] = '\n' then count_colored_tiles_in_colored_section' section_map (-64) (y - 1) tile_color section_color only_within_diamond only_outside_diamond (i + 1) acc
    else if section_map.[i] = '.' then
      if only_within_diamond == true && abs x + abs y > 64 then count_colored_tiles_in_colored_section' section_map (x + 1) y tile_color section_color only_within_diamond only_outside_diamond (i + 1) acc
      else if only_outside_diamond == true && abs x + abs y <= 64 then count_colored_tiles_in_colored_section' section_map (x + 1) y tile_color section_color only_within_diamond only_outside_diamond (i + 1) acc
      else if tile_color == section_color && (abs x + abs y) mod 2 == 0 then count_colored_tiles_in_colored_section' section_map (x + 1) y tile_color section_color only_within_diamond only_outside_diamond (i + 1) (acc + 1)
      else if tile_color != section_color && (abs x + abs y) mod 2 != 0 then count_colored_tiles_in_colored_section' section_map (x + 1) y tile_color section_color only_within_diamond only_outside_diamond (i + 1) (acc + 1)
      else count_colored_tiles_in_colored_section' section_map (x + 1) y tile_color section_color only_within_diamond only_outside_diamond (i + 1) acc
    else count_colored_tiles_in_colored_section' section_map (x + 1) y tile_color section_color only_within_diamond only_outside_diamond (i + 1) acc
  in
  count_colored_tiles_in_colored_section' section_map x y tile_color section_color only_within_diamond only_outside_diamond 0 0;;

let red_tiles_in_red_section = count_colored_tiles_in_colored_section input_challenge (-64) 64 'r' 'r' false false;;
let red_tiles_in_black_section = count_colored_tiles_in_colored_section input_challenge (-64) 64 'b' 'r' false false;;
let black_tiles_in_black_section = count_colored_tiles_in_colored_section input_challenge (-64) 64 'b' 'b' false false;;
let black_tiles_in_black_section_within_diamond = count_colored_tiles_in_colored_section input_challenge (-64) 64 'b' 'b' true false ;;
let black_tiles_in_black_section_outside_diamond = count_colored_tiles_in_colored_section input_challenge (-64) 64 'b' 'b' false true;;

(* Step Math:
  26501365 - 65 = 26501300
  26501300 / 131 = 202300
  202300 * 131 = 26501300
  *)

(* Solution is equal to the number of red tiles contained in: 
   + all the black and red sections reachable that aren't on a side or corner
   + 2 black sections (for the corners) 
   + 2 black diamonds (also for the corners)
   + 1 red outside_diamond (for the extra red side length piece next to thr corners)
   + 3 * side_length black sections
   + 1 * side_length black diamonds
   + 1 * side_length red outside_diamonds
   *)

(* side_length = 202300 - 1 = 202299 *)

print_string "Part 2: the Elf could reach ";
  print_string (string_of_int black_tiles_in_black_section_within_diamond);
  print_endline " garden plots in 26501365 steps";;
