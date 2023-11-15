import { convertMultiLineFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { jumpUntilOutOfBounds } from "./jumpUntilOutOfBounds.ts";
import type { Maze } from "./types.ts";

export const solvePart1 = (async (): Promise<number> => {
  const maze: Maze = [];
  const mazeString: string[] = await convertMultiLineFileToArray(
    "./challengeInput.txt",
  );
  mazeString.forEach((jumpInstruction) => {
    maze.push(parseInt(jumpInstruction));
  });

  const currentIndex = 0;
  let numberOfStepsTaken = 0;
  numberOfStepsTaken = jumpUntilOutOfBounds(
    maze,
    currentIndex,
    numberOfStepsTaken,
  );

  console.log(`Part 1: ${numberOfStepsTaken}`);

  return numberOfStepsTaken;
})();
