import { XYCoordinates } from "../commonTypes.ts";

const getCartesianDistanceXY = (
  coordinates1: XYCoordinates,
  coordinates2: XYCoordinates,
): number =>
  Math.sqrt(
    (coordinates2.x - coordinates1.x) ** 2 +
      (coordinates2.y - coordinates1.y) ** 2,
  );
export { getCartesianDistanceXY };
