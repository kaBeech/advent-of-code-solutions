import { convertMultiLineFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { Maze } from "./types.ts";

export const parseInput = async (): Promise<Maze> => {
  const maze: Maze = [];
  const mazeString: string[] = await convertMultiLineFileToArray(
    "./challengeInput.txt",
  );
  mazeString.forEach((jumpInstruction) => {
    maze.push(parseInt(jumpInstruction));
  });
  return maze;
};
