package ExplorerTest api;

class Game {
  var number: i32;
  // Hardcode gameStringLength into gameChars declation because I'm having  
  // difficulty getting Carbon to recognize the integer 
  var gameChars: [String; 200];
  var currentGameCharIndex: i32;
  var isPossible: bool;
  var colonFound: bool;
  var isParsed: bool;
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
  let gameStringLength: i32 = 200;
  // Hardcode gameStringLength into rawGames declation because I'm having  
  // difficulty getting Carbon to recognize the integer
  let rawGames: [[String; 200]; 2] = (("G", "a", "m", "e", " ", "1", ":", " ", "3", " ", "b", "l", "u", "e", ",", " ", "4", " ", "r", "e", "d", ";", " ", "1", "4", " ", "r", "e", "d", ",", " ", "2", " ", "g", "r", "e", "e", "n", ",", " ", "6", " ", "b", "l", "u", "e", ";", " ", "2", " ", "g", "r", "e", "e", "n", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "2", ":", " ", "6", " ", "r", "e", "d", ",", " ", "1", " ", "b", "l", "u", "e", ",", " ", "3", " ", "g", "r", "e", "e", "n", ";", " ", "2", " ", "b", "l", "u", "e", ",", " ", "1", " ", "r", "e", "d", ",", " ", "2", " ", "g", "r", "e", "e", "n", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"));
  var currentGameIndex: i32 = 0;
  let numberOfGames: i32 = 2;
  var possibleGamesSum: i32 = 0;

  while (currentGameIndex < numberOfGames) {
    var game: Game = { 
      .number = currentGameIndex + 1,
      .gameChars = rawGames[currentGameIndex],
      .currentGameCharIndex = 0,
      .isPossible = true,
      .colonFound = false,
      .isParsed = false,
      };

      while (game.currentGameCharIndex < gameStringLength) {
        if (game.colonFound == false) {
          game.colonFound = FindColon(game);
        // } else if (game.isParsed == false) {
        //   game.isParsed = CheckForEndOfLine(game);
        } else if (game.isPossible) {
          let possibilityResult: PossibilityResult = CheckCurrentGameCharForGamePossibility(game);
          game.isPossible = possibilityResult.isPossible;
          game.currentGameCharIndex = possibilityResult.newCurrentGameCharIndex;
        } else {
          possibleGamesSum = possibleGamesSum + game.number;
          game.currentGameCharIndex = 199;
        }

        game.currentGameCharIndex = game.currentGameCharIndex + 1;
      }

    currentGameIndex = currentGameIndex + 1;
  }

  Print("Sum of all possible games: {0}", possibleGamesSum);
  return 0;
}