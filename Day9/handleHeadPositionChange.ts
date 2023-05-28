import { XYCoordinate } from "../tools/commonTypes.ts";
import { getDifference } from "../tools/mathFunctions/getDifference.ts";

const handleHeadPositionChange = (
  currentTailPosition: XYCoordinate,
  headPosition: XYCoordinate,
): XYCoordinate => {
  const xDifference = getDifference(headPosition[0], currentTailPosition[0]);
  const yDifference = getDifference(headPosition[1], currentTailPosition[1]);

  if (
    (xDifference === 2 && yDifference === 2) || xDifference > 2 ||
    yDifference > 2
  ) {
    throw new Error(
      `Head position is too far away from (i.e. not adjacent to) current tail position! Received currentTailPosition: [${currentTailPosition}], headPosition: [${headPosition}]`,
    );
  }

  if (
    xDifference < 2 &&
    yDifference < 2
  ) {
    return currentTailPosition;
  }

  const newTailPosition = [currentTailPosition[0], currentTailPosition[1]];

  // HEAD
  if (xDifference === ropeLength) {
    headPosition[0] < currentTailPosition[0]
      ? newTailPosition[0]--
      : newTailPosition[0]++;
    if (yDifference === ropeLength - 1) {
      headPosition[1] < currentTailPosition[1]
        ? newTailPosition[1]--
        : newTailPosition[1]++;
    }
  }

  if (yDifference === ropeLength) {
    headPosition[1] < currentTailPosition[1]
      ? newTailPosition[1]--
      : newTailPosition[1]++;
    if (xDifference === ropeLength - 1) {
      headPosition[0] < currentTailPosition[0]
        ? newTailPosition[0]--
        : newTailPosition[0]++;
    }
  }
  //
      headPosition[1] >
      currentTailPosition[1] &&
    newTailPosition[1]++;
  headPosition[1] < currentTailPosition[1] && newTailPosition[1]--;
  headPosition[0] < currentTailPosition[0] && newTailPosition[0]--;
  headPosition[0] > currentTailPosition[0] && newTailPosition[0]++;
  //parent of 7e66d9a (Make Rope length modular)
  return newTailPosition as XYCoordinate;
};

export { handleHeadPositionChange };
