import { XYCoordinate } from "../tools/commonTypes.ts";
import { getDifference } from "../tools/mathFunctions/getDifference.ts";

const handleHeadPositionChange = (
  currentTailPosition: XYCoordinate,
  headPosition: XYCoordinate,
  ropeLength: number,
): XYCoordinate => {
  const xDifference = getDifference(headPosition[0], currentTailPosition[0]);
  const yDifference = getDifference(headPosition[1], currentTailPosition[1]);

  if (
    (xDifference === ropeLength && yDifference === ropeLength) ||
    xDifference > ropeLength ||
    yDifference > ropeLength
  ) {
    throw new Error(
      `Head position is too far away from (i.e. not adjacent to) current tail position! Received currentTailPosition: [${currentTailPosition}], headPosition: [${headPosition}]`,
    );
  }

  const newTailPosition = [currentTailPosition[0], currentTailPosition[1]];

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

  return newTailPosition as XYCoordinate;
};

export { handleHeadPositionChange };
