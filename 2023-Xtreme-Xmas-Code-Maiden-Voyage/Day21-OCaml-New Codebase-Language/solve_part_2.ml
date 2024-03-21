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
    else if section_map.[i] = '\n' then count_colored_tiles_in_colored_section' section_map (-65) (y - 1) tile_color section_color only_within_diamond only_outside_diamond (i + 1) acc
    else if section_map.[i] = '.' then
      if only_within_diamond == true && abs x + abs y > 65 then count_colored_tiles_in_colored_section' section_map (x + 1) y tile_color section_color only_within_diamond only_outside_diamond (i + 1) acc
      else if only_outside_diamond == true && abs x + abs y <= 65 then count_colored_tiles_in_colored_section' section_map (x + 1) y tile_color section_color only_within_diamond only_outside_diamond (i + 1) acc
      else if tile_color == section_color && (abs x + abs y) mod 2 == 0 then count_colored_tiles_in_colored_section' section_map (x + 1) y tile_color section_color only_within_diamond only_outside_diamond (i + 1) (acc + 1)
      else if tile_color != section_color && (abs x + abs y) mod 2 != 0 then count_colored_tiles_in_colored_section' section_map (x + 1) y tile_color section_color only_within_diamond only_outside_diamond (i + 1) (acc + 1)
      else count_colored_tiles_in_colored_section' section_map (x + 1) y tile_color section_color only_within_diamond only_outside_diamond (i + 1) acc
    else count_colored_tiles_in_colored_section' section_map (x + 1) y tile_color section_color only_within_diamond only_outside_diamond (i + 1) acc
  in
  count_colored_tiles_in_colored_section' section_map x y tile_color section_color only_within_diamond only_outside_diamond 0 0;;

let red_tiles_in_red_section = count_colored_tiles_in_colored_section input_challenge (-65) 65 'r' 'r' false false;;
let red_tiles_in_black_section = count_colored_tiles_in_colored_section input_challenge (-65) 65 'b' 'r' false false;;
(* let black_tiles_in_black_section = count_colored_tiles_in_colored_section input_challenge (-65) 65 'b' 'b' false false;; *)
let black_tiles_in_red_section = count_colored_tiles_in_colored_section input_challenge (-65) 65 'b' 'r' false false;;
(* let black_tiles_in_black_section_within_diamond = count_colored_tiles_in_colored_section input_challenge (-65) 65 'b' 'b' true false ;; *)
(* let black_tiles_in_black_section_outside_diamond = count_colored_tiles_in_colored_section input_challenge (-65) 65 'b' 'b' false true;; *)
let red_tiles_in_black_section_within_diamond = count_colored_tiles_in_colored_section input_challenge (-65) 65 'r' 'b' true false;;
let red_tiles_in_red_section_outside_diamond = count_colored_tiles_in_colored_section input_challenge (-65) 65 'r' 'r' false true;;

(* Step Math:
  26501365 - 65 = 26501300
  26501300 / 131 = 202300
  202300 * 131 = 26501300
  *)

(* Solution is equal to the number of red tiles contained in: 
   + all the black and red sections reachable that aren't on a side or corner = 71618852901 red sections + 10231322500 black sections
   + 2 black sections (for the corners) 
   + 2 black diamonds (also for the corners)
   + 1 red outside_diamond (for the extra red side length piece next to the corners)
   + 3 * side_length black sections (for the sides)
   + 1 * side_length black diamonds (for the sides)
   + 1 * side_length red outside_diamonds (for the sides)
   *)

(* Variables for solution equation:
   x = big steps
   BS = number of red tiles in black sections
   RS = number of red tiles in red sections
   BD = number of red tiles *inside* the diamond in black sections
   RD = number of red tiles *outside* the diamond in red sections 
   BI = number of black inside sections (the math to find this is below, but the shorthand is useful for defining the number of red inside sections)
   *)
(* Solution = <inside sections> ((x/2)^2)BS + (2x^2 - 2x + 1 - BI) </>  + <side sections> 3xBS + 1xBD + 1xRD </> + <corner sections> 2BS + 2BD + 1RD </> *)

let x = 202300;;
let bs = red_tiles_in_black_section;;
let rs = red_tiles_in_red_section;;
let bd = red_tiles_in_black_section_within_diamond;; 
let rd = red_tiles_in_red_section_outside_diamond;;

let inside_sections = 2 * (x * x) - 2 * x + 1;;
let black_inside_sections = (x / 2) * (x / 2);;
let red_inside_sections = inside_sections - black_inside_sections;;

let solution_part_2 = (black_inside_sections * bs) + (red_inside_sections * rs) + (3 * x * bs) + (x * bd) + (x * rd) + (2 * bs) + (2 * bd) + rd;;

(* side_length = big_steps - 1 = 202300 - 1 = 202299 *)
(* number_of_inside_sections = 2 * (big_steps^2) - 2 * big_steps + 1 = 2 * (202300^2) - 2 * 202300 + 1 = 81850175401 *)
(* number_of_black_inside_sections = big_steps divided by 2, then rounded up, then squared = (202300 / 2)^2 = 10231322500 *)
(* number_of_red_inside_sections = number_of_inside_sections - number_of_black_inside_sections = 71618852901 *)

(* print_endline (string_of_int red_tiles_in_red_section); *)
  (* print_endline (string_of_int red_tiles_in_black_section); *)
  (* print_endline (string_of_int black_tiles_in_red_section); *)
  (* print_endline (string_of_int black_tiles_in_black_section); *)
  (* print_endline (string_of_int black_tiles_in_black_section_within_diamond); *)
  (* print_endline (string_of_int black_tiles_in_black_section_outside_diamond); *)
print_string "Part 2: the Elf could reach ";
  print_string (string_of_int solution_part_2);
  print_endline " garden plots in 26501365 steps";;