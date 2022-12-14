import { OrthagonalDirection2D, TreeMap } from "./types.ts";
import { convertXYCoordinatesToIndexNumber } from "../tools/conversionFunctions/convertXYCoordinatesToIndexNumber.ts";
import { getNextTreeCoordinates } from "./getNextTreeCoordinates.ts";

const countVisibleTrees = (
  treeIndex: number,
  treeMap: TreeMap,
  direction: OrthagonalDirection2D,
): number => {
  if (treeIndex < 0 || treeIndex >= treeMap.trees.length) {
    throw new Error(
      `Index must be within domain! Received Index: ${treeIndex}, Domain: 0-${
        treeMap.trees.length - 1
      }`,
    );
  }
  if (treeIndex % 1 !== 0) {
    throw new Error(
      `Index must be a positive integer! Received: ${treeIndex}`,
    );
  }

  let visibleTreesCounter = 0;
  const tree = treeMap.trees[treeIndex];

  const nextTreeCoordinates = getNextTreeCoordinates(
    tree.getLocation(),
    treeMap.sideLength,
    direction,
  );
  let nextTreeIndex = -1;
  try {
    convertXYCoordinatesToIndexNumber(
      nextTreeCoordinates,
      treeMap.sideLength,
    );
    nextTreeIndex = convertXYCoordinatesToIndexNumber(
      nextTreeCoordinates,
      treeMap.sideLength,
    );
  } catch (err) {
    if (err.message.includes(`Coordinates must all be in domain!`)) {
      return visibleTreesCounter;
    } else throw err;
  }

  visibleTreesCounter += 1;
  const nextTree = treeMap.trees[nextTreeIndex];

  if (nextTree.getHeight() >= tree.getHeight()) {
    return visibleTreesCounter;
  }

  visibleTreesCounter += countVisibleTrees(nextTreeIndex, treeMap, direction);

  return visibleTreesCounter;
};

export { countVisibleTrees };
