import { Explorer } from "./Explorer.ts";
import { populateTileMap } from "./populateTileMap.ts";

const solvePart2 = async (challengeInput: string): Promise<number> => {
  const tileMap = await populateTileMap(challengeInput);
  const explorer = Explorer(tileMap);
  const shortestPathLength = explorer.findShortestPathToLowestElevation()!;
  return shortestPathLength;
};

export { solvePart2 };
