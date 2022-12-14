import { ModalBoolean } from "../tools/commonTypes.ts";
import { checkVisibility } from "./checkVisibility.ts";
import { parseTreesString } from "./parseTreesString.ts";
import { OrthagonalDirection2D, Tree, TreeMap } from "./types.ts";
let visibleTreesTotal = 0;
let treeMap = null as unknown as TreeMap;

const assessVisibility = (tree: Tree) => {
  let directionCounter = 0;
  let overallVisibility: ModalBoolean = null;
  while (directionCounter < 4 && overallVisibility !== true) {
    if (
      checkVisibility(
        treeMap.trees.indexOf(tree),
        treeMap,
        directionCounter as OrthagonalDirection2D,
      )
    ) overallVisibility = true;
    directionCounter += 1;
  }
  if (overallVisibility === true) visibleTreesTotal += 1;
};

const getVisibleTreesTotal = async (treeGridFile: string) => {
  visibleTreesTotal = 0;
  treeMap = await parseTreesString(treeGridFile);

  treeMap.trees.forEach(assessVisibility);

  return visibleTreesTotal;
};

export { getVisibleTreesTotal };
