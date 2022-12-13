import { OrthagonalDirection2D, TreeMap } from "./types.ts";
import { convertXYCoordinatesToIndexNumber } from "../tools/conversionFunctions/convertXYCoordinatesToIndexNumber.ts";

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
  }  if (treeIndex % 1 !== 0) {
    throw new Error(
      `Index must be a positive integer! Received: ${treeIndex}`,
    );
  }

  const tree = treeMap.trees[treeIndex];
  if (tree.getVisibility()[direction] !== null) {
    return tree.getVisibility()[direction] as boolean;
  }

  const nextTreeCoordinates = tree.getLocation();
  let nextTreeIndex = -1;
  switch (direction) {
    case 0:
      nextTreeCoordinates[0] -= 1;
      break;
    case 1:
      nextTreeCoordinates[1] -= 1;
      break;
    case 2:
      nextTreeCoordinates[0] += 1;
      break;
    case 3:
      nextTreeCoordinates[1] += 1;
      break;
  }
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

  const nextTree = treeMap.trees[nextTreeIndex];

  if (nextTree.getHeight() >= tree.getHeight()) {
    tree.setVisibility(false, direction);
    return false;
  }

  const result: boolean = checkVisibility(nextTreeIndex, treeMap, direction);
  tree.setVisibility(
    result,
    direction,
  );
  return result;
};

export { checkVisibility };
