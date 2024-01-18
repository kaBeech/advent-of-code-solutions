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
  // Replace this test input with the contents of the parsedInput1.txt file created by the parseInput.ts program, like so:
  // let rawGames: [[String; 160]; 10] = (("G", "a", "m", "e", " ", "1", ":", " ", ... "X", "X"));
  let rawGames: [[String; 160]; 5] = (("G", "a", "m", "e", " ", "1", ":", " ", "3", " ", "b", "l", "u", "e", ",", " ", "4", " ", "r", "e", "d", ";", " ", "1", " ", "r", "e", "d", ",", " ", "2", " ", "g", "r", "e", "e", "n", ",", " ", "6", " ", "b", "l", "u", "e", ";", " ", "2", " ", "g", "r", "e", "e", "n", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "2", ":", " ", "1", " ", "b", "l", "u", "e", ",", " ", "2", " ", "g", "r", "e", "e", "n", ";", " ", "3", " ", "g", "r", "e", "e", "n", ",", " ", "4", " ", "b", "l", "u", "e", ",", " ", "1", " ", "r", "e", "d", ";", " ", "1", " ", "g", "r", "e", "e", "n", ",", " ", "1", " ", "b", "l", "u", "e", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "3", ":", " ", "8", " ", "g", "r", "e", "e", "n", ",", " ", "6", " ", "b", "l", "u", "e", ",", " ", "2", "0", " ", "r", "e", "d", ";", " ", "5", " ", "b", "l", "u", "e", ",", " ", "4", " ", "r", "e", "d", ",", " ", "1", "3", " ", "g", "r", "e", "e", "n", ";", " ", "5", " ", "g", "r", "e", "e", "n", ",", " ", "1", " ", "r", "e", "d", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "4", ":", " ", "1", " ", "g", "r", "e", "e", "n", ",", " ", "3", " ", "r", "e", "d", ",", " ", "6", " ", "b", "l", "u", "e", ";", " ", "3", " ", "g", "r", "e", "e", "n", ",", " ", "6", " ", "r", "e", "d", ";", " ", "3", " ", "g", "r", "e", "e", "n", ",", " ", "1", "5", " ", "b", "l", "u", "e", ",", " ", "1", "4", " ", "r", "e", "d", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "5", ":", " ", "6", " ", "r", "e", "d", ",", " ", "1", " ", "b", "l", "u", "e", ",", " ", "3", " ", "g", "r", "e", "e", "n", ";", " ", "2", " ", "b", "l", "u", "e", ",", " ", "1", " ", "r", "e", "d", ",", " ", "2", " ", "g", "r", "e", "e", "n", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"))
  var currentGameIndex: i32 = 0;
  var possibleGamesSum: i32 = 0;

  while (currentGameIndex < numberOfGames) {
    var game: Game = { 
      .number = currentGameIndex + 11,
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