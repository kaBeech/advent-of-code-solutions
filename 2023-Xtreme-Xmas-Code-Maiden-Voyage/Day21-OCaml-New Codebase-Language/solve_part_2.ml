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

let read_file_to_lines filename =
  let chan = open_in filename in
  let rec read_lines acc =
    try
      let line = input_line chan in
      read_lines (line :: acc)
    with End_of_file ->
      close_in chan;
      List.rev acc
  in
  read_lines []

(* let input_challenge = read_file_to_string "challengeInput.dat";; *)
(* let my_string = List.nth input_challenge 5;; *)
(* let my_char = my_string.[4];; *)

(* print_endline my_string;; *)
(* print_char my_char;; *)

(* Print my_data to the console *)
(* List.iter print_endline my_data;; *)

(* print_char my_data.[0];; *)


(* A black square is a space that can be moved to in an even number of steps *)
(* A red square is a space that can be moved to in an odd number of steps *)
(* The starting position is a black square *)
(* A section is a 131 x 131 grid composed of the challenge input map *)
(* These sections are tiled together to make the complete map *)
(* Just like the red and black squares, a red section is a section that orthagonally borders only black sections, and vice versa *)
(* The starting position is in a black section *)

(* Might need to change that 64 to 65 to reflect the new number of steps *)
let little_steps = 65;;
let neg_little_steps = -1 * little_steps;;

(* For tile_color and section_color, use 'r' for red and 'b' for black *)
let count_color_tiles_in_color_section section_map x y tile_color section_color within_diamond outside_diamond =
  let rec count_color_tiles_in_color_section' section_map x y tile_color section_color within_diamond outside_diamond i acc =
    if i = String.length section_map then acc
    else if section_map.[i] = '\n' then count_color_tiles_in_color_section' section_map (neg_little_steps) (y - 1) tile_color section_color within_diamond outside_diamond (i + 1) acc
    else if section_map.[i] = '.' then
      if within_diamond == true && abs x + abs y > little_steps then count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond (i + 1) acc
      else if outside_diamond == true && abs x + abs y <= little_steps then count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond (i + 1) acc
      else if tile_color == section_color && (abs x + abs y) mod 2 == 0 then count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond (i + 1) (acc + 1)
      else if tile_color != section_color && (abs x + abs y) mod 2 != 0 then count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond (i + 1) (acc + 1)
      else count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond (i + 1) acc
    else count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond (i + 1) acc
  in
  count_color_tiles_in_color_section' section_map x y tile_color section_color within_diamond outside_diamond 0 0;;

let red_tiles_in_red_section = count_color_tiles_in_color_section input_challenge (neg_little_steps) little_steps 'r' 'r' false false;;
let red_tiles_in_black_section = count_color_tiles_in_color_section input_challenge (neg_little_steps) little_steps 'r' 'b' false false;;
(* let black_tiles_in_black_section = count_color_tiles_in_color_section input_challenge (neg_little_steps) little_steps 'b' 'b' false false;; *)
(* let black_tiles_in_red_section = count_color_tiles_in_color_section input_challenge (neg_little_steps) little_steps 'b' 'r' false false;; *)
(* let black_tiles_in_black_section_within_diamond = count_color_tiles_in_color_section input_challenge (neg_little_steps) little_steps 'b' 'b' true false ;; *)
(* let black_tiles_in_black_section_outside_diamond = count_color_tiles_in_color_section input_challenge (neg_little_steps) little_steps 'b' 'b' false true;; *)
let red_tiles_in_black_section_within_diamond = count_color_tiles_in_color_section input_challenge (neg_little_steps) little_steps 'r' 'b' true false;;
let red_tiles_in_red_section_outside_diamond = count_color_tiles_in_color_section input_challenge (neg_little_steps) little_steps 'r' 'r' false true;;
let red_tiles_in_red_section_within_diamond = count_color_tiles_in_color_section input_challenge (neg_little_steps) little_steps 'r' 'r' true false;;
let red_tiles_in_black_section_outside_diamond = count_color_tiles_in_color_section input_challenge (neg_little_steps) little_steps 'r' 'b' false true;;

(* Step Math:
  26501365 total steps - 65 steps to reach edge of map = 26501300 subtotal steps
  26501300 subtotal steps / 131 steps across map = 202300 big steps
  *)

(* side_length = big_steps - 1 = 202300 - 1 = 202299 *)
(* Solution is equal to the number of red tiles contained in: 
   + all the black and red sections reachable that aren't on a side or corner
   + big_steps ^ 2 red sections (insides)
   + side_length ^ 2 black sections (insides)
   + 2 black sections (for the corners) 
   + 2 black diamonds (also for the corners)
   + 1 red outside_diamond (for the extra red side length piece next to the corners)
   + 3 * side_length black sections (for the sides)
   + 1 * side_length black diamonds (for the sides)
   + 1 * side_length red outside_diamonds (for the sides)
   *)


(* number_of_inside_sections = 2 * (big_steps^2) - 2 * big_steps + 1 = 2 * (202300^2) - 2 * 202300 + 1 *)
(* number_of_black_inside_sections = side_length^2 *)
(* number_of_red_inside_sections = number_of_inside_sections - number_of_black_inside_sections = 71618852901 *)

(* Variables for solution equation:
   x = big steps
   s = side length
   BS = number of red tiles in black sections
   RS = number of red tiles in red sections
   BD = number of red tiles *inside* the diamond in black sections
   RD = number of red tiles *outside* the diamond in red sections 
   BI = number of black inside sections (the math to find this is below, but the shorthand is useful for defining the number of red inside sections)
   *)
(* Solution = <inside sections> ((s^2)BS + (2x^2 - 2x + 1 - BI) </>  + <side sections> 3sBS + 1sBD + 1sRD </> + <corner sections> 2BS + 2BD + 1RD </> *)

let x = 202300;;
let s = x - 1;;
let bs = red_tiles_in_black_section;;
let rs = red_tiles_in_red_section;;
let bd = red_tiles_in_black_section_within_diamond;; 
let rd = red_tiles_in_red_section_outside_diamond;;
(* let bc = red_tiles_in_black_section_outside_diamond;; *)

(* print_endline (string_of_int (3 * bs + bd + rd));; *)
(* print_endline (string_of_int (4 * bd + 3 * bc + rd));; *)

(* let inside_sections = 2 * (x * x) - 2 * x + 1;; *)
let black_inside_sections = s * s;;
(* let red_inside_sections = inside_sections - black_inside_sections;; *)
let red_inside_sections = x * x;;
let  black_side_sections = 3 * s;;
let black_side_diamonds = s;;
let red_side_outside_diamonds = s;;
let black_corner_sections = 2;;
let black_corner_diamonds = 2;;
let red_corner_outside_diamonds = 1;;


let solution_part_2 = (black_inside_sections * bs) + (red_inside_sections * rs) + (3 * s * bs) + (s * bd) + (s * rd) + (2 * bs) + (2 * bd) + rd;;

(* print_endline (string_of_int red_tiles_in_red_section_within_diamond); *)
  (* print_endline (string_of_int red_tiles_in_black_section); *)
  (* print_endline (string_of_int black_tiles_in_red_section); *)
  (* print_endline (string_of_int black_tiles_in_black_section); *)
  (* print_endline (string_of_int black_tiles_in_black_section_within_diamond); *)
  (* print_endline (string_of_int black_tiles_in_black_section_outside_diamond); *)
print_string "Part 2: the Elf could reach ";
  print_string (string_of_int solution_part_2);
  print_endline " garden plots in 26501365 steps";;
