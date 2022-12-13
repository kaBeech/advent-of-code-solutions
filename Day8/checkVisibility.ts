import { OrthagonalDirection2D, TreeMap } from "./types.ts";
import { convertXYCoordinatesToIndexNumber } from "../tools/conversionFunctions/convertXYCoordinatesToIndexNumber.ts";
import { getNextTreeCoordinates } from "./getNextTreeCoordinates.ts";

const checkVisibility = (
  treeIndex: number,
  treeMap: TreeMap,
  direction: OrthagonalDirection2D,
): boolean => {
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

  const tree = treeMap.trees[treeIndex];
  if (tree.getVisibility()[direction] !== null) {
    return tree.getVisibility()[direction] as boolean;
  }

  let nextTreeCoordinates = getNextTreeCoordinates(
    tree.getLocation(), treeMap.sideLength,
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
      tree.setVisibility(true, direction);
      return true;
    } else throw err;
  }

  let nextTree = treeMap.trees[nextTreeIndex];

  if (nextTree.getHeight() >= tree.getHeight()) {
    tree.setVisibility(false, direction);
    return false;
  }

  // if the next tree isn't visible, compare against the tree after that one instead
  while (
    !checkVisibility(
      nextTreeIndex,
      treeMap,
      direction,
    )
  ) {
    nextTreeCoordinates = getNextTreeCoordinates(
      nextTree.getLocation(), treeMap.sideLength,
      direction,
    );
    nextTreeIndex = convertXYCoordinatesToIndexNumber(
      nextTreeCoordinates,
      treeMap.sideLength,
    );
    nextTree = treeMap.trees[nextTreeIndex];
    if (nextTree.getHeight() >= tree.getHeight()) {
      tree.setVisibility(false, direction);
      return false;
    }
  }

  return true;
};

export { checkVisibility };
