import { verifyXYCoordinates } from "../tools/verificationFunctions/verifyXYCoordinates.ts";
import { OrthagonalDirection2D } from "./types.ts";

const getNextTreeCoordinates = (
  currentTreeCoordinates: number[],
  base: number,
  direction: OrthagonalDirection2D,
) => {
  verifyXYCoordinates(currentTreeCoordinates, base);
  const nextTreeCoordinates = currentTreeCoordinates.slice();
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
  }
  return nextTreeCoordinates;
};

export { getNextTreeCoordinates };
