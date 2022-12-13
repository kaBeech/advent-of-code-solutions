import { verifyXYCoordinates } from "../verificationFunctions/verifyXYCoordinates.ts";

const convertXYCoordinatesToIndexNumber = (
  xyCoordinates: number[],
  base: number,
) => {
  verifyXYCoordinates(xyCoordinates, base);

  const index = (xyCoordinates[0] + (xyCoordinates[1] * base));

  return index;
};

export { convertXYCoordinatesToIndexNumber };
