interface Game {
  id: string;
  sets: GameSet[];
}

interface GameSet {
  red: number;
  green: number;
  blue: number;
}

export const solvePart1 = (async (): Promise<number> => {
  const input = await Deno.readTextFile("./challengeInput.txt");
  const inputArray = input.split("\n");
  let sum = 0;

  inputArray.forEach((line) => {
    const game = parseGame(line);
    if (gameIsPossible(game, 12, 13, 14)) {
      sum += +game.id;
    }
  });

  console.log(sum);
  return sum;
})();

const parseCube = (gameSet: GameSet, currentCube: string): GameSet => {
  const [rawCubeCount, cubeColor] = currentCube.trim().split(" ");
  if (!isValidColor(cubeColor)) {
    return gameSet;
  }
  gameSet[cubeColor as keyof GameSet] = parseInt(rawCubeCount);

  return gameSet;
};

const parseGameSet = (rawGameSet: string): GameSet => {
  const gameSet = rawGameSet.split(",").reduce<GameSet>(parseCube, {
    red: 0,
    green: 0,
    blue: 0,
  });
  return gameSet;
};

const parseGame = (game: string): Game => {
  const [rawGameId, rawGameGameSets] = game.split(":");
  const gameId = rawGameId.split(" ")[1];
  const sets = rawGameGameSets.split(";").map(parseGameSet);
  const gameSet: Game = {
    id: gameId,
    sets: sets,
  };
  return gameSet;
};

const gameIsPossible = (
  game: Game,
  redMax: number,
  greenMax: number,
  blueMax: number,
): boolean => {
  return game.sets.every((gameSet) => {
    if (gameSet.red > redMax) return false;
    if (gameSet.green > greenMax) return false;
    if (gameSet.blue > blueMax) return false;
    return true;
  });
};

const isValidColor = (color: string): boolean => {
  return ["red", "green", "blue"].includes(color);
};
