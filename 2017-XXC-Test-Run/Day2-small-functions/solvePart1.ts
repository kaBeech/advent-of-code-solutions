import getArrayOfRowsOfValues from "./getArrayOfRowsOfValues.ts";
import calculateChecksum from "./calculateChecksum.ts";
export const solvePart1 = async () => {
  const arrayOfRowsOfValues = await getArrayOfRowsOfValues();
  return calculateChecksum(arrayOfRowsOfValues);
};
