import { populateTileMap } from "./populateTileMap.ts";

const solvePart1 = async (challengeInput: string): Promise<string> => {
  const tileMap = await populateTileMap(challengeInput);
  return challengeInput;
};

export { solvePart1 };
