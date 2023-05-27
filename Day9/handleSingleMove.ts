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
  movementDirection === "U"
    ? newPosition[1]++
    : movementDirection === "D"
    ? newPosition[1]--
    : movementDirection === "L"
    ? newPosition[0]--
    : newPosition[0]++;

  return newPosition as XYCoordinate;
};

export { handleSingleMove };
