package ExplorerTest api;

fn Main() -> i32 {
  var games: auto = (("G", "a", "m", "e", " ", "1", ":", " ", "3", " ", "b", "l", "u", "e", ",", " ", "4", " ", "r", "e", "d", ";", " ", "1", " ", "r", "e", "d", ",", " ", "2", " ", "g", "r", "e", "e", "n", ",", " ", "6", " ", "b", "l", "u", "e", ";", " ", "2", " ", "g", "r", "e", "e", "n"), ("G", "a", "m", "e", " ", "2", ":", " ", "6", " ", "r", "e", "d", ",", " ", "1", " ", "b", "l", "u", "e", ",", " ", "3", " ", "g", "r", "e", "e", "n", ";", " ", "2", " ", "b", "l", "u", "e", ",", " ", "1", " ", "r", "e", "d", ",", " ", "2", " ", "g", "r", "e", "e", "n"));
  var i: i32 = 0;
  let numberOfGames: i32 = 2;
  var j: i32 = 0;
  let gamesLength: i32 = 108;
  var possibleGamesSum: i32 = 0;

  var test: auto = ("t", "e", "s", "t");

  while (i < numberOfGames) {
    while (j < gamesLength) {
      j = j + 1;
    Print(test[0]);
    }
    i = i + 1;
  }

  Print("Printing {0}", 1);
  return 0;
}