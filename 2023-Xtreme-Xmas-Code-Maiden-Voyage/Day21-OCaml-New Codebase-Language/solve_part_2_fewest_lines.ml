let challenge_input =
  let chan = open_in "challengeInput.dat" in
  let rec read_lines acc =
    try
      let line = input_line chan in
      read_lines (line :: acc)
    with End_of_file ->
      close_in chan;
      List.rev acc
  in
  read_lines []
let count_color_tiles_in_color_section section_map x y tile_color section_color within_diamond outside_diamond =
  let rec count_color_tiles_in_color_section' section_map x y tile_color section_color within_diamond outside_diamond i j acc =
    let acc_if_tile_is_reachable section_map x y tile_color section_color within_diamond outside_diamond i j acc =
      if (within_diamond == true && abs x + abs y > 65) || (outside_diamond == true && abs x + abs y <= 65) then count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond i (j + 1) acc
      else if (tile_color == section_color && (abs x + abs y) mod 2 == 0) || (tile_color != section_color && (abs x + abs y) mod 2 != 0) then count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond i (j + 1) (acc + 1)
      else count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond i (j + 1) acc
    in
    if i = List.length section_map then acc
    else if j = String.length (List.nth section_map i) then count_color_tiles_in_color_section' section_map (-65) (y - 1) tile_color section_color within_diamond outside_diamond (i + 1) 0 acc
    else if i = 0 || j == 0 || i = 130 || j == 130 then 
      acc_if_tile_is_reachable section_map x y tile_color section_color within_diamond outside_diamond i j acc
    else if (List.nth section_map i).[j] = 'S' || (List.nth section_map i).[j] = '.' && ((List.nth section_map (i + 1)).[j] = '.' || (List.nth section_map i).[j + 1] = '.' || (List.nth section_map (i - 1)).[j] = '.' || (List.nth section_map i).[j - 1] = '.') then (* Don't count garden plots that are completely surrounded by rocks! *)
      acc_if_tile_is_reachable section_map x y tile_color section_color within_diamond outside_diamond i j acc
    else count_color_tiles_in_color_section' section_map (x + 1) y tile_color section_color within_diamond outside_diamond i (j + 1) acc
  in
  count_color_tiles_in_color_section' section_map x y tile_color section_color within_diamond outside_diamond 0 0 0;;
let solution_part_2 = (202299  * 202299 * (count_color_tiles_in_color_section challenge_input (-65) 65 'r' 'b' false false)) + (202300 * 202300 * (count_color_tiles_in_color_section challenge_input (-65) 65 'r' 'r' false false)) + (3 * 202299 * (count_color_tiles_in_color_section challenge_input (-65) 65 'r' 'b' false false)) + (202299   * (count_color_tiles_in_color_section challenge_input (-65) 65 'r' 'b' true false)) + (202299  * (count_color_tiles_in_color_section challenge_input (-65) 65 'r' 'r' false true)) + (2 * (count_color_tiles_in_color_section challenge_input (-65) 65 'r' 'b' false false)) + (2 * (count_color_tiles_in_color_section challenge_input (-65) 65 'r' 'b' true false)) + (count_color_tiles_in_color_section challenge_input (-65) 65 'r' 'r' false true);;
print_endline (string_of_int solution_part_2);
