import { jumpUntilOutOfBounds } from "./jumpUntilOutOfBounds.ts";
import { parseInput } from "./parseInput.ts";
import type { Maze } from "./types.ts";

export const solvePart1 = (async (): Promise<number> => {
  const maze: Maze = await parseInput();
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
