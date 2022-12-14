import { getVisibleTreesTotal } from "./getVisibleTreesTotal.ts";
import { getHighestScenicScore } from "./getHighestScenicScore.ts";

const app = (async (
  treeGridFile?: string,
): Promise<{ visibleTreesTotal: number; highestScenicScore: number }> => {
  if (!treeGridFile) {
    treeGridFile = "tests/treeGrid.txt";
  }

  const visibleTreesTotal = await getVisibleTreesTotal(treeGridFile);
  const highestScenicScore = await getHighestScenicScore(treeGridFile);

  console.log(`Part 1: How many trees are visible from outside the forest?
    Solution: ${visibleTreesTotal}`);
  console.log(`Part 2: How many trees are visible from outside the forest?
    Solution: ${highestScenicScore}`);

  return {
    visibleTreesTotal,
    highestScenicScore,
  };
})();

export { app };
