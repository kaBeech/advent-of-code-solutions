import { Maze } from "./types.ts";

export const jumpUntilOutOfBounds = (
  maze: Maze,
  currentIndex: number,
  numberOfStepsTaken: number,
): number => {
  if (currentIndex < 0 || currentIndex >= maze.length) {
    return numberOfStepsTaken;
  } else {
    const currentJumpInstruction = maze[currentIndex];
    maze[currentIndex]++;
    currentIndex += currentJumpInstruction;
    numberOfStepsTaken++;
    return jumpUntilOutOfBounds(maze, currentIndex, numberOfStepsTaken);
  }
};
