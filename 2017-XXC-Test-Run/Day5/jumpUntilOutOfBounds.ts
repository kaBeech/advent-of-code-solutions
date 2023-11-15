import { Maze } from "./types.ts";

export const jumpUntilOutOfBounds = (
  maze: Maze,
  currentIndex: number,
  numberOfStepsTaken: number,
): number => {
  if (currentIndex < 0 || currentIndex >= maze.length) {
    return numberOfStepsTaken;
  } else {
    const jumpInstruction = maze[currentIndex];
    maze[currentIndex]++;
    currentIndex += jumpInstruction - 1;
    numberOfStepsTaken++;
    return jumpUntilOutOfBounds(maze, currentIndex, numberOfStepsTaken);
  }
};
