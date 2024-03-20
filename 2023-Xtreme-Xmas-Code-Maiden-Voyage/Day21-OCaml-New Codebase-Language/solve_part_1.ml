let my_string = "#.#.###...#.#";;

let count_dots str =
  let rec count_dots' str i =
    if i = String.length str then 0
    else if str.[i] = '.' then 1 + count_dots' str (i + 1)
    else count_dots' str (i + 1)
  in
  count_dots' str 0;;

let dots = count_dots my_string;;

(* Print *)

print_endline "hello";
  print_endline "world";
  print_endline my_string;;
  print_endline (string_of_int dots);;
