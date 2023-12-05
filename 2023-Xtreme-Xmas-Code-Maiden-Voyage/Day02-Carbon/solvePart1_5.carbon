package ExplorerTest api;

class Game {
  var number: i32;
  // Hardcode gameStringLength into gameChars declation because I'm having  
  // difficulty getting Carbon to recognize the integer 
  var gameChars: [String; 160];
  var currentGameCharIndex: i32;
  var isPossible: bool;
  var colonFound: bool;
  var isParsed: bool;
  var addedToSum: bool;
}

class PossibilityResult {
  var isPossible: bool;
  var newCurrentGameCharIndex: i32;
}

fn FindColon(game: Game) -> bool {
  var colonFound: bool = game.colonFound;

  if (game.gameChars[game.currentGameCharIndex] == ":") {
    colonFound = true;
  }

  return colonFound;
}

fn CheckForEndOfLine(game: Game) -> bool {
  var isParsed: bool = game.isParsed;

  if (game.gameChars[game.currentGameCharIndex] == "X") {
    isParsed = true;
  }

  return isParsed;
}

fn CheckCurrentGameCharForGamePossibility(game: Game) -> PossibilityResult {
   var possibilityResult: PossibilityResult = {
    .isPossible = game.isPossible,
    .newCurrentGameCharIndex = game.currentGameCharIndex,
  };
  match (game.gameChars[game.currentGameCharIndex]) {
    case "1" => {
      match (game.gameChars[game.currentGameCharIndex + 1]) {
        // If we have 15 or more of any cube, game is not possible
        case "3" => {
          if (game.gameChars[game.currentGameCharIndex + 3] == "r") {
            possibilityResult.isPossible = false;
          } else {
            possibilityResult.newCurrentGameCharIndex = game.currentGameCharIndex + 1;
          }
        }
        case "4" => {
          if (game.gameChars[game.currentGameCharIndex + 3] == "r") {
            possibilityResult.isPossible = false;
          } else if (game.gameChars[game.currentGameCharIndex + 3] == "g") {
            possibilityResult.isPossible = false;
          } else {
            possibilityResult.newCurrentGameCharIndex = game.currentGameCharIndex + 1;
          }
        }
        case "5" => {
            possibilityResult.isPossible = false;
        }
        case "6" => {
            possibilityResult.isPossible = false;
        }
        case "7" => {
            possibilityResult.isPossible = false;
        }
        case "8" => {
            possibilityResult.isPossible = false;
        }
        case "9" => {
            possibilityResult.isPossible = false;
        }
        default => {
          // Only do something if gameChar is an integer
          // If we have 12 or less of any cube, game is possible
        }
      }
    }
    case "2" => {
      if (game.gameChars[game.currentGameCharIndex + 1] == "0") {
      // If we have 20 of any cube, game is not possible
        possibilityResult.isPossible = false;
      }
    }
    default => {
      // Only do something if gameChar is an integer
      // Maximum number of cubes is 20 and if we have less than 10 cubes, game is possible
    }
  }
 
  return possibilityResult;
}

fn Main() -> i32 {
  let gameStringLength: i32 = 160;
  // Hardcode gameStringLength and numberOfGames into rawGames declation because I'm having  
  // difficulty getting Carbon to recognize the integer
  let numberOfGames: i32 = 10;
  let rawGames: [[String; 160]; 10] = (("G", "a", "m", "e", " ", "5", "1", ":", " ", "2", " ", "g", "r", "e", "e", "n", ",", " ", "1", "1", " ", "r", "e", "d", ",", " ", "7", " ", "b", "l", "u", "e", ";", " ", "5", " ", "b", "l", "u", "e", ",", " ", "1", "3", " ", "r", "e", "d", ";", " ", "1", " ", "g", "r", "e", "e", "n", ",", " ", "2", " ", "b", "l", "u", "e", ",", " ", "3", " ", "r", "e", "d", ";", " ", "6", " ", "b", "l", "u", "e", ",", " ", "8", " ", "r", "e", "d", ";", " ", "1", "1", " ", "r", "e", "d", ",", " ", "2", " ", "g", "r", "e", "e", "n", ",", " ", "4", " ", "b", "l", "u", "e", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "5", "2", ":", " ", "1", "5", " ", "b", "l", "u", "e", ",", " ", "1", " ", "g", "r", "e", "e", "n", ",", " ", "4", " ", "r", "e", "d", ";", " ", "4", " ", "g", "r", "e", "e", "n", ",", " ", "1", "0", " ", "b", "l", "u", "e", ",", " ", "2", " ", "r", "e", "d", ";", " ", "6", " ", "r", "e", "d", ",", " ", "1", "8", " ", "b", "l", "u", "e", ",", " ", "1", " ", "g", "r", "e", "e", "n", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "5", "3", ":", " ", "2", " ", "r", "e", "d", ",", " ", "1", "0", " ", "g", "r", "e", "e", "n", ",", " ", "6", " ", "b", "l", "u", "e", ";", " ", "4", " ", "g", "r", "e", "e", "n", ",", " ", "3", " ", "b", "l", "u", "e", ",", " ", "3", " ", "r", "e", "d", ";", " ", "1", "7", " ", "b", "l", "u", "e", ",", " ", "1", "9", " ", "g", "r", "e", "e", "n", ",", " ", "5", " ", "r", "e", "d", ";", " ", "6", " ", "b", "l", "u", "e", ",", " ", "6", " ", "g", "r", "e", "e", "n", ",", " ", "9", " ", "r", "e", "d", ";", " ", "5", " ", "b", "l", "u", "e", ",", " ", "1", "7", " ", "g", "r", "e", "e", "n", ",", " ", "7", " ", "r", "e", "d", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "5", "4", ":", " ", "9", " ", "b", "l", "u", "e", ",", " ", "8", " ", "r", "e", "d", ",", " ", "6", " ", "g", "r", "e", "e", "n", ";", " ", "6", " ", "r", "e", "d", ",", " ", "8", " ", "g", "r", "e", "e", "n", ";", " ", "1", " ", "g", "r", "e", "e", "n", ",", " ", "6", " ", "b", "l", "u", "e", ",", " ", "1", " ", "r", "e", "d", ";", " ", "5", " ", "r", "e", "d", ",", " ", "4", " ", "g", "r", "e", "e", "n", ",", " ", "9", " ", "b", "l", "u", "e", ";", " ", "5", " ", "b", "l", "u", "e", ",", " ", "2", " ", "g", "r", "e", "e", "n", ",", " ", "5", " ", "r", "e", "d", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "5", "5", ":", " ", "8", " ", "b", "l", "u", "e", ",", " ", "8", " ", "r", "e", "d", ",", " ", "1", "0", " ", "g", "r", "e", "e", "n", ";", " ", "3", " ", "r", "e", "d", ",", " ", "4", " ", "g", "r", "e", "e", "n", ",", " ", "9", " ", "b", "l", "u", "e", ";", " ", "4", " ", "r", "e", "d", ",", " ", "3", " ", "g", "r", "e", "e", "n", ",", " ", "7", " ", "b", "l", "u", "e", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "5", "6", ":", " ", "3", " ", "r", "e", "d", ",", " ", "6", " ", "g", "r", "e", "e", "n", ",", " ", "1", " ", "b", "l", "u", "e", ";", " ", "5", " ", "g", "r", "e", "e", "n", ",", " ", "1", " ", "b", "l", "u", "e", ",", " ", "1", " ", "r", "e", "d", ";", " ", "1", " ", "r", "e", "d", ",", " ", "2", " ", "g", "r", "e", "e", "n", ";", " ", "1", "0", " ", "g", "r", "e", "e", "n", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "5", "7", ":", " ", "1", " ", "g", "r", "e", "e", "n", ",", " ", "4", " ", "b", "l", "u", "e", ",", " ", "1", "2", " ", "r", "e", "d", ";", " ", "1", "7", " ", "r", "e", "d", ",", " ", "7", " ", "b", "l", "u", "e", ",", " ", "1", "0", " ", "g", "r", "e", "e", "n", ";", " ", "1", "7", " ", "r", "e", "d", ",", " ", "5", " ", "b", "l", "u", "e", ",", " ", "3", " ", "g", "r", "e", "e", "n", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "5", "8", ":", " ", "1", " ", "r", "e", "d", ",", " ", "5", " ", "g", "r", "e", "e", "n", ",", " ", "1", "4", " ", "b", "l", "u", "e", ";", " ", "5", " ", "g", "r", "e", "e", "n", ",", " ", "6", " ", "r", "e", "d", ",", " ", "7", " ", "b", "l", "u", "e", ";", " ", "4", " ", "b", "l", "u", "e", ",", " ", "8", " ", "g", "r", "e", "e", "n", ";", " ", "3", " ", "r", "e", "d", ",", " ", "9", " ", "g", "r", "e", "e", "n", ",", " ", "7", " ", "b", "l", "u", "e", ";", " ", "8", " ", "b", "l", "u", "e", ",", " ", "8", " ", "g", "r", "e", "e", "n", ",", " ", "6", " ", "r", "e", "d", ";", " ", "8", " ", "g", "r", "e", "e", "n", ",", " ", "7", " ", "b", "l", "u", "e", ",", " ", "5", " ", "r", "e", "d", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "5", "9", ":", " ", "3", " ", "g", "r", "e", "e", "n", ",", " ", "5", " ", "r", "e", "d", ";", " ", "2", " ", "r", "e", "d", ",", " ", "1", "3", " ", "g", "r", "e", "e", "n", ",", " ", "1", " ", "b", "l", "u", "e", ";", " ", "1", "9", " ", "g", "r", "e", "e", "n", ",", " ", "1", " ", "r", "e", "d", ",", " ", "1", " ", "b", "l", "u", "e", ";", " ", "1", "9", " ", "g", "r", "e", "e", "n", ",", " ", "1", " ", "b", "l", "u", "e", ";", " ", "1", "8", " ", "g", "r", "e", "e", "n", ",", " ", "1", " ", "b", "l", "u", "e", ",", " ", "5", " ", "r", "e", "d", ";", " ", "6", " ", "r", "e", "d", ",", " ", "9", " ", "g", "r", "e", "e", "n", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "6", "0", ":", " ", "5", " ", "r", "e", "d", ",", " ", "1", " ", "g", "r", "e", "e", "n", ",", " ", "6", " ", "b", "l", "u", "e", ";", " ", "8", " ", "r", "e", "d", ",", " ", "6", " ", "b", "l", "u", "e", ",", " ", "1", "4", " ", "g", "r", "e", "e", "n", ";", " ", "8", " ", "g", "r", "e", "e", "n", ",", " ", "8", " ", "r", "e", "d", ",", " ", "3", " ", "b", "l", "u", "e", ";", " ", "2", " ", "b", "l", "u", "e", ",", " ", "5", " ", "g", "r", "e", "e", "n", ",", " ", "3", " ", "r", "e", "d", ";", " ", "4", " ", "b", "l", "u", "e", ",", " ", "1", " ", "r", "e", "d", ",", " ", "1", "4", " ", "g", "r", "e", "e", "n", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"));
  var currentGameIndex: i32 = 0;
  var possibleGamesSum: i32 = 0;

  while (currentGameIndex < numberOfGames) {
    var game: Game = { 
      .number = currentGameIndex + 51,
      .gameChars = rawGames[currentGameIndex],
      .currentGameCharIndex = 0,
      .isPossible = true,
      .colonFound = false,
      .isParsed = false,
      .addedToSum = false,
      };

      while (game.currentGameCharIndex < gameStringLength) {
        // Print(game.gameChars[game.currentGameCharIndex]);
        if (game.isParsed == false) {
          game.isParsed = CheckForEndOfLine(game);
        } else if (game.addedToSum == false) {
          if (game.isPossible) {
            possibleGamesSum = possibleGamesSum + game.number;
            game.addedToSum = true;
          } 
        }
        
        if (game.colonFound == false) {
          game.colonFound = FindColon(game);
        } else if (game.isPossible) {
          let possibilityResult: PossibilityResult = CheckCurrentGameCharForGamePossibility(game);
          game.isPossible = possibilityResult.isPossible;
          game.currentGameCharIndex = possibilityResult.newCurrentGameCharIndex;
        } else {
        // If game is not possible, skip to end of line
          game.currentGameCharIndex = 199;
        }

        game.currentGameCharIndex = game.currentGameCharIndex + 1;
      }

    currentGameIndex = currentGameIndex + 1;
  }

  Print("Sum of all possible games: {0}", possibleGamesSum);
  return possibleGamesSum;
}