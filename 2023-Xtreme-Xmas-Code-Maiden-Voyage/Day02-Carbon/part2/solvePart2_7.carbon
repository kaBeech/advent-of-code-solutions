package ExplorerTest api;

class Game {
  var number: i32;
  // Hardcode gameStringLength into gameChars declaration because I'm having  
  // difficulty getting Carbon to recognize the integer 
  var gameChars: [String; 160];
  var currentGameCharIndex: i32;
  var colonFound: bool;
  var isParsed: bool;
  var addedToSum: bool;
  var redCubes: i32;
  var greenCubes: i32;
  var blueCubes: i32;
  var cubeSetPower: i32;
}

class CubeValue {
  var color: String;
  var number: i32;
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

fn GetCubeColor(game: Game, index: i32) -> String {
  var cubeColor: String = "";

  match (game.gameChars[index]) {
    case "r" => {
      cubeColor = "red";
    }
    case "g" => {
      cubeColor = "green";
    }
    case "b" => {
      cubeColor = "blue";
    }
    default => {
      Print("Error: Invalid cube color");
    }
  }

  return cubeColor;
}

fn CheckCurrentGameCharForCubeValue(game: Game) -> CubeValue {
   var cubeValue: CubeValue = {
    .color = "",
    .number = 0,
    // Maximum cube value is 20
    .newCurrentGameCharIndex = game.currentGameCharIndex,
  };
  match (game.gameChars[game.currentGameCharIndex]) {
    case "1" => {
      match (game.gameChars[game.currentGameCharIndex + 1]) {
        case "0" => {
          cubeValue.number = 10;
          cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 3);
          cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 6;
        }
        case "1" => {
          cubeValue.number = 11;
          cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 3);
          cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 6;
        }
        case "2" => {
          cubeValue.number = 12;
          cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 3);
          cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 6;
        }
        case "3" => {
          cubeValue.number = 13;
          cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 3);
          cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 6;
        }
        case "4" => {
          cubeValue.number = 14;
          cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 3);
          cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 6;
        }
        case "5" => {
          cubeValue.number = 15;
          cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 3);
          cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 6;
        }
        case "6" => {
          cubeValue.number = 16;
          cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 3);
          cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 6;
        }
        case "7" => {
          cubeValue.number = 17;
          cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 3);
          cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 6;
        }
        case "8" => {
          cubeValue.number = 18;
          cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 3);
          cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 6;
        }
        case "9" => {
          cubeValue.number = 19;
          cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 3);
          cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 6;
        }
        default => {
          cubeValue.number = 1;
          cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 2);
          cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 5;
        }
      }
    }
    case "2" => {
      if (game.gameChars[game.currentGameCharIndex + 1] == "0") {
        cubeValue.number = 20;
        cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 3);
        cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 6;
      } else {
        cubeValue.number = 2;
        cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 2);
        cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 5;
      }
    }
    case "3" => {
      cubeValue.number = 3;
      cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 2);
      cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 5;
    }
    case "4" => {
      cubeValue.number = 4;
      cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 2);
      cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 5;
    }
    case "5" => {
      cubeValue.number = 5;
      cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 2);
      cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 5;
    }
    case "6" => {
      cubeValue.number = 6;
      cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 2);
      cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 5;
    }
    case "7" => {
      cubeValue.number = 7;
      cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 2);
      cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 5;
    }
    case "8" => {
      cubeValue.number = 8;
      cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 2);
      cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 5;
    }
    case "9" => {
      cubeValue.number = 9;
      cubeValue.color = GetCubeColor(game, game.currentGameCharIndex + 2);
      cubeValue.newCurrentGameCharIndex = game.currentGameCharIndex + 5;
    }
    default => {
      // Only do something if gameChar is an integer
    }
  }
 
  return cubeValue;
}

fn Main() -> i32 {
  let gameStringLength: i32 = 160;
  // Hardcode gameStringLength and numberOfGames into rawGames declaration because I'm having  
  // difficulty getting Carbon to recognize the integer
  let numberOfGames: i32 = 10;
  // Replace this test input with the contents of the parsedInput7.txt file created by the parseInput.ts program, like so:
  // let rawGames: [[String; 160]; 10] = (("G", "a", "m", "e", " ", "1", ":", " ", ... "X", "X"));
  let rawGames: [[String; 160]; 5] = (("G", "a", "m", "e", " ", "1", ":", " ", "3", " ", "b", "l", "u", "e", ",", " ", "4", " ", "r", "e", "d", ";", " ", "1", " ", "r", "e", "d", ",", " ", "2", " ", "g", "r", "e", "e", "n", ",", " ", "6", " ", "b", "l", "u", "e", ";", " ", "2", " ", "g", "r", "e", "e", "n", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "2", ":", " ", "1", " ", "b", "l", "u", "e", ",", " ", "2", " ", "g", "r", "e", "e", "n", ";", " ", "3", " ", "g", "r", "e", "e", "n", ",", " ", "4", " ", "b", "l", "u", "e", ",", " ", "1", " ", "r", "e", "d", ";", " ", "1", " ", "g", "r", "e", "e", "n", ",", " ", "1", " ", "b", "l", "u", "e", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "3", ":", " ", "8", " ", "g", "r", "e", "e", "n", ",", " ", "6", " ", "b", "l", "u", "e", ",", " ", "2", "0", " ", "r", "e", "d", ";", " ", "5", " ", "b", "l", "u", "e", ",", " ", "4", " ", "r", "e", "d", ",", " ", "1", "3", " ", "g", "r", "e", "e", "n", ";", " ", "5", " ", "g", "r", "e", "e", "n", ",", " ", "1", " ", "r", "e", "d", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "4", ":", " ", "1", " ", "g", "r", "e", "e", "n", ",", " ", "3", " ", "r", "e", "d", ",", " ", "6", " ", "b", "l", "u", "e", ";", " ", "3", " ", "g", "r", "e", "e", "n", ",", " ", "6", " ", "r", "e", "d", ";", " ", "3", " ", "g", "r", "e", "e", "n", ",", " ", "1", "5", " ", "b", "l", "u", "e", ",", " ", "1", "4", " ", "r", "e", "d", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"), ("G", "a", "m", "e", " ", "5", ":", " ", "6", " ", "r", "e", "d", ",", " ", "1", " ", "b", "l", "u", "e", ",", " ", "3", " ", "g", "r", "e", "e", "n", ";", " ", "2", " ", "b", "l", "u", "e", ",", " ", "1", " ", "r", "e", "d", ",", " ", "2", " ", "g", "r", "e", "e", "n", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"))
  var currentGameIndex: i32 = 0;
  var cubeSetPowerSum: i32 = 0;

  while (currentGameIndex < numberOfGames) {
    var game: Game = { 
      .number = currentGameIndex + 71,
      .gameChars = rawGames[currentGameIndex],
      .currentGameCharIndex = 0,
      .colonFound = false,
      .isParsed = false,
      .addedToSum = false,
      .redCubes = 0,
      .greenCubes = 0,
      .blueCubes = 0,
      .cubeSetPower = 0,
      };

      while (game.currentGameCharIndex < gameStringLength) {
        if (game.colonFound == false) {
          game.colonFound = FindColon(game);
        } else if (game.isParsed == false) {
          game.isParsed = CheckForEndOfLine(game);
          let cubeValue: CubeValue = CheckCurrentGameCharForCubeValue(game);
          if (cubeValue.color == "red" and cubeValue.number > game.redCubes) {
            game.redCubes = cubeValue.number;
          } else if (cubeValue.color == "green" and cubeValue.number > game.greenCubes) {
            game.greenCubes = cubeValue.number;
          } else if (cubeValue.color == "blue" and cubeValue.number > game.blueCubes) {
            game.blueCubes = cubeValue.number;
          }
          game.currentGameCharIndex = cubeValue.newCurrentGameCharIndex;
        } else if (game.addedToSum == false) {
          game.cubeSetPower = game.redCubes * game.greenCubes * game.blueCubes;
          cubeSetPowerSum = cubeSetPowerSum + game.cubeSetPower;
          game.addedToSum = true;
        } else {
          // If cubeSetPower is already added to sum, skip to end of line
          game.currentGameCharIndex = 199;
        }

        game.currentGameCharIndex = game.currentGameCharIndex + 1;
      }

    currentGameIndex = currentGameIndex + 1;
  }

  Print("Sum of all cube set powers: {0}", cubeSetPowerSum);
  return cubeSetPowerSum;
}