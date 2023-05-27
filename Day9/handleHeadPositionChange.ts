import { XYCoordinate } from "../tools/commonTypes.ts";

const handleHeadPositionChange = (
  headPosition: XYCoordinate,
  currentPosition: XYCoordinate,
): XYCoordinate => {
  console.log(currentPosition, headPosition);

  const result: XYCoordinate = [0, 0];

  return result;
};

export { handleHeadPositionChange };
