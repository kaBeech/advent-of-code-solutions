import { getViewingDistance } from "./getViewingDistance.ts";
import { parseTreesString } from "./parseTreesString.ts";
import { OrthagonalDirection2D, Tree, TreeMap } from "./types.ts";
let _highestScenicScoreTree = null as unknown as Tree;
let highestScenicScore = 0;
let treeMap = null as unknown as TreeMap;

const assessScenicScore = (tree: Tree) => {
  let directionCounter = 0;
  let scenicScore = 1;
  while (directionCounter < 4) {
    scenicScore *= getViewingDistance(
      treeMap.trees.indexOf(tree),
      treeMap,
      directionCounter as OrthagonalDirection2D,
    );
    directionCounter += 1;
  }
  if (scenicScore > highestScenicScore) {
    _highestScenicScoreTree = tree;
    highestScenicScore = scenicScore;
  }
};

const getHighestScenicScore = async (treeGridFile: string) => {
  _highestScenicScoreTree = null as unknown as Tree;
  highestScenicScore = 0;
  treeMap = await parseTreesString(treeGridFile);

  treeMap.trees.forEach(assessScenicScore);

  return highestScenicScore;
};

export { getHighestScenicScore };
