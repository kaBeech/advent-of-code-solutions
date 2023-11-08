import calculateDivisionResult from "./calculateDivisionResult.ts";
export default function (arrayOfRowsOfValues: string[][]): number {
  let sumOfDivisionResults = 0;
  arrayOfRowsOfValues.forEach((row) => {
    sumOfDivisionResults += calculateDivisionResult(row);
  });
  return sumOfDivisionResults;
}
