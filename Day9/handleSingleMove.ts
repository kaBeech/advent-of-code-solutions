import { XYCoordinate } from "../tools/commonTypes.ts";

type MovementDirection =
  | "U"
  | "D"
  | "L"
  | "R";

let total = 0;

const handleSingleMove = (
  currentPosition: XYCoordinate,
  movementDirection: MovementDirection,
): XYCoordinate => {
  const newPosition: XYCoordinate = [0, 0];

  return newPosition;
};

export { handleSingleMove };
