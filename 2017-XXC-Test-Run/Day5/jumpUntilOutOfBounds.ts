import { Maze } from "./types.ts";

export const jumpUntilOutOfBounds = (
  maze: Maze,
  currentIndex: number,
  numberOfStepsTaken: number,
): number => {
  while (currentIndex >= 0 && currentIndex < maze.length) {
    const currentJumpInstruction = maze[currentIndex];
    maze[currentIndex]++;
    currentIndex += currentJumpInstruction;
    numberOfStepsTaken++;
  }
  return numberOfStepsTaken;
};
