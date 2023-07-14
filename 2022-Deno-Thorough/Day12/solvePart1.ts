import { Explorer } from "./Explorer.ts";
import { populateTileMap } from "./populateTileMap.ts";

const solvePart1 = async (challengeInput: string): Promise<number> => {
  const tileMap = await populateTileMap(challengeInput);
  const explorer = Explorer(tileMap.startTile, tileMap.endTile);
  const shortestPathLength = explorer.explore();
  return shortestPathLength;
};

export { solvePart1 };
