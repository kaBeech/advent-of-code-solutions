package ExplorerTest api;

fn Main() -> i32 {
  var games: [[String; 200]; 2] = (("G", "a", "m", "e", " ", "1", ":", " ", "3", " ", "b", "l", "u", "e", ",", " ", "4", " ", "r", "e", "d", ";", " ", "1", " ", "r", "e", "d", ",", " ", "2", " ", "g", "r", "e", "e", "n", ",", " ", "6", " ", "b", "l", "u", "e", ";", " ", "2", " ", "g", "r", "e", "e", "n", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "2", ":", " ", "6", " ", "r", "e", "d", ",", " ", "1", " ", "b", "l", "u", "e", ",", " ", "3", " ", "g", "r", "e", "e", "n", ";", " ", "2", " ", "b", "l", "u", "e", ",", " ", "1", " ", "r", "e", "d", ",", " ", "2", " ", "g", "r", "e", "e", "n", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"));
  var i: i32 = 0;
  let numberOfGames: i32 = 2;
  var j: i32 = 0;
  let gamesLength: i32 = 108;
  var possibleGamesSum: i32 = 0;

  while (i < numberOfGames) {
    var gameIsPossible: bool = true;
    var gameNumber: i32 = 0;
    
    while (j < gamesLength) {

      while (gameNumber < 1) {
        match (games[i][j]) {
          case "1" => {
            // return;
          }
          case "2" => {
            // return;
          }
          default => {
            // return;
          }
        }
        j = j + 1;
      }

      if (games[i][j] == "r") {
           Print(games[i][j]);
      }
      j = j + 1;

    }

    i = i + 1;
  }

  Print("Printing {0}", 1);
  return 0;
}