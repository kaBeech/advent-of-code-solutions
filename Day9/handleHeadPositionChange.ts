import { XYCoordinate } from "../tools/commonTypes.ts";
import { getDifference } from "../tools/mathFunctions/getDifference.ts";

const handleHeadPositionChange = (
  currentPosition: XYCoordinate,
  headPosition: XYCoordinate,
): XYCoordinate => {
  const xDifference = getDifference(headPosition[0], currentPosition[0]);
  const yDifference = getDifference(headPosition[1], currentPosition[1]);

  // if (( xDifference === 2 && yDifference === 2) || xDifference > 2 || yDifference > 2 ) { throw error }

  if (
    xDifference < 2 &&
    yDifference < 2
  ) {
    return currentPosition;
  }

  const newPosition = [currentPosition[0], currentPosition[1]];

  headPosition[1] > currentPosition[1] && newPosition[1]++;
  headPosition[1] < currentPosition[1] && newPosition[1]--;
  headPosition[0] < currentPosition[0] && newPosition[0]--;
  headPosition[0] > currentPosition[0] && newPosition[0]++;

  return newPosition as XYCoordinate;
};

export { handleHeadPositionChange };
