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

let input_challenge = read_file_to_lines "challengeInput.dat";;

(* A black square is a space that can be moved to in an even number of steps *)
(* A red square is a space that can be moved to in an odd number of steps *)
(* The starting position is a black square *)
(* A section is a 131 x 131 grid composed of the challenge input map *)
(* These sections are tiled together to make the complete map *)
(* Just like the red and black squares, a red section is a section that orthagonally borders only black sections, and vice versa *)
(* The starting position is in a black section *)

let little_steps = 65;;
let neg_little_steps = -1 * little_steps;;

(* For tile_color and section_color, use 'r' for red and 'b' for black *)
let count_color_tiles_in_color_section section_map x y tile_color section_color within_diamond outside_diamond =
  let rec count_color_tiles_in_color_section' section_map x y tile_color section_color within_diamond outside_diamond i j acc =
    if i = List.length section_map then acc
    else if j = String.length (List.nth section_map i) then count_color_tiles_in_color_section' section_map (neg_little_steps) (y - 1) tile_color section_color within_diamond outside_diamond (i + 1) 0 acc
    else if i = 0 || j == 0 || i = 130 || j == 130 then 
      if within_diamond == true && abs x + abs y > little_steps then count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond i (j + 1) acc
      else if outside_diamond == true && abs x + abs y <= little_steps then count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond i (j + 1) acc
      else if tile_color == section_color && (abs x + abs y) mod 2 == 0 then count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond i (j + 1) (acc + 1)
      else if tile_color != section_color && (abs x + abs y) mod 2 != 0 then count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond i (j + 1) (acc + 1)
      else count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond i (j + 1) acc
    else if (List.nth section_map i).[j] = 'S' || (List.nth section_map i).[j] = '.' && ((List.nth section_map (i + 1)).[j] = '.' || (List.nth section_map i).[j + 1] = '.' || (List.nth section_map (i - 1)).[j] = '.' || (List.nth section_map i).[j - 1] = '.') then
      if within_diamond == true && abs x + abs y > little_steps then count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond i (j + 1) acc
      else if outside_diamond == true && abs x + abs y <= little_steps then count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond i (j + 1) acc
      else if tile_color == section_color && (abs x + abs y) mod 2 == 0 then count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond i (j + 1) (acc + 1)
      else if tile_color != section_color && (abs x + abs y) mod 2 != 0 then count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond i (j + 1) (acc + 1)
      else count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond i (j + 1) acc
    else count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond i (j + 1) acc
  in
  count_color_tiles_in_color_section' section_map x y tile_color section_color within_diamond outside_diamond 0 0 0;;

let red_tiles_in_red_section = count_color_tiles_in_color_section input_challenge (neg_little_steps) little_steps 'r' 'r' false false;;
let red_tiles_in_black_section = count_color_tiles_in_color_section input_challenge (neg_little_steps) little_steps 'r' 'b' false false;;
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


(* number_of_red_inside_sections = big_steps^2 *)
(* number_of_black_inside_sections = side_length^2 *)

(* Variables for solution equation:
   x = big steps
   s = side length
   BS = number of red tiles in black sections
   RS = number of red tiles in red sections
   BD = number of red tiles *inside* the diamond in black sections
   RD = number of red tiles *outside* the diamond in red sections 
   *)
(* Solution = <inside sections> ((x^2)RS + (s^2)BS </>  + <side sections> 3sBS + 1sBD + 1sRD </> + <corner sections> 2BS + 2BD + 1RD </> *)

let x = 202300;;
let s = x - 1;;
let bs = red_tiles_in_black_section;;
let rs = red_tiles_in_red_section;;
let bd = red_tiles_in_black_section_within_diamond;; 
let rd = red_tiles_in_red_section_outside_diamond;;

let red_inside_sections = x * x;;
let black_inside_sections = s * s;;

let solution_part_2 = (black_inside_sections * bs) + (red_inside_sections * rs) + (3 * s * bs) + (s * bd) + (s * rd) + (2 * bs) + (2 * bd) + rd;;

print_string "Part 2: the Elf could reach ";
  print_string (string_of_int solution_part_2);
  print_endline " garden plots in 26501365 steps";;
