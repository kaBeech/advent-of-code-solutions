import { Explorer } from "./Explorer.ts";
import { populateTileMap } from "./populateTileMap.ts";

const solvePart1 = async (challengeInput: string): Promise<number> => {
  const tileMap = await populateTileMap(challengeInput);
  const explorer = Explorer(tileMap);
  const shortestPathLength = explorer.findShortestPathToDestination()!;
  return shortestPathLength;
};

export { solvePart1 };
