import { XYCoordinate } from "../tools/commonTypes.ts";

type MovementDirection =
  | "U"
  | "D"
  | "L"
  | "R";

const handleSingleMove = (
  currentPosition: XYCoordinate,
  movementDirection: MovementDirection,
): XYCoordinate => {
  const newPosition = [currentPosition[0], currentPosition[1]];
  if (movementDirection === "U") {
    newPosition[1]++;
  } else if (movementDirection === "D") {
    newPosition[1]--;
  } else if (movementDirection === "L") {
    newPosition[0]--;
  } else {
    newPosition[0]++;
  }
  return newPosition as XYCoordinate;
};

export { handleSingleMove };
