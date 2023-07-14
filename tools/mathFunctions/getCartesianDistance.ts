import { XYCoordinate } from "../commonTypes.ts";

const getCartesianDistanceXY = (
  coordinates1: XYCoordinate,
  coordinates2: XYCoordinate,
): number =>
  Math.sqrt(
    (coordinates2[0] - coordinates1[0]) ** 2 +
      (coordinates2[1] - coordinates1[1]) ** 2,
  );
export { getCartesianDistanceXY };
