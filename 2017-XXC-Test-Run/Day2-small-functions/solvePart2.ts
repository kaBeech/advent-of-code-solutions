import calculateSumOfDivisionResults from "./calculateSumOfDivisionResults.ts";
import getArrayOfRowsOfValues from "./getArrayOfRowsOfValues.ts";
export const solvePart2 = async () => {
  const arrayOfRowsOfValues = await getArrayOfRowsOfValues();
  return calculateSumOfDivisionResults(arrayOfRowsOfValues);
};
