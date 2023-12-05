package ExplorerTest api;

class Game {
  var number: i32;
  // Hardcode gameStringLength into gameChars declation because I'm having  
  // difficulty getting Carbon to recognize the integer 
  var gameChars: [String; 200];
  var currentGameCharIndex: i32;
  var gameIsPossible: bool;
}

// fn SetGameNumber(game: Game) -> i32 {
//   var gameNumber: i32 = 0;
//   match (game.gameChars[6]) {
//     case "1" => {
//       gameNumber = 1;
//     }
//     case "2" => {
//       gameNumber = 2;
//     }
//     case "3" => {
//       gameNumber = 3;
//     }
//     case "4" => {
//       gameNumber = 4;
//     }
//     case "5" => {
//       gameNumber = 5;
//     }
//     case "6" => {
//       gameNumber = 6;
//     }
//     case "7" => {
//       gameNumber = 7;
//     }
//     case "8" => {
//       gameNumber = 8;
//     }
//     case "9" => {
//       gameNumber = 9;
//     }
//     case "0" => {
//       gameNumber = 0;
//     }
//     default => {
//       // Do nothing
//     }
//   }
//   return gameNumber;
// }

fn Main() -> i32 {
  let gameStringLength: i32 = 200;
  // Hardcode gameStringLength into rawGames declation because I'm having  
  // difficulty getting Carbon to recognize the integer
  let rawGames: [[String; 200]; 2] = (("G", "a", "m", "e", " ", "1", ":", " ", "3", " ", "b", "l", "u", "e", ",", " ", "4", " ", "r", "e", "d", ";", " ", "1", " ", "r", "e", "d", ",", " ", "2", " ", "g", "r", "e", "e", "n", ",", " ", "6", " ", "b", "l", "u", "e", ";", " ", "2", " ", "g", "r", "e", "e", "n", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "2", ":", " ", "6", " ", "r", "e", "d", ",", " ", "1", " ", "b", "l", "u", "e", ",", " ", "3", " ", "g", "r", "e", "e", "n", ";", " ", "2", " ", "b", "l", "u", "e", ",", " ", "1", " ", "r", "e", "d", ",", " ", "2", " ", "g", "r", "e", "e", "n", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"));
  var currentGameIndex: i32 = 0;
  let numberOfGames: i32 = 2;
  var possibleGamesSum: i32 = 0;

  while (currentGameIndex < numberOfGames) {
    var game: Game = { 
      .number = currentGameIndex + 1,
      .gameChars = rawGames[currentGameIndex],
      .currentGameCharIndex = 0,
      .gameIsPossible = true,
      };
    while (game.currentGameCharIndex < gameStringLength) {

      if (game.gameChars[game.currentGameCharIndex] == "r") {
           Print(game.gameChars[game.currentGameCharIndex]);
      }
      game.currentGameCharIndex = game.currentGameCharIndex + 1;

    }

    currentGameIndex = currentGameIndex + 1;
  }

  Print("Printing {0}", 1);
  return 0;
}