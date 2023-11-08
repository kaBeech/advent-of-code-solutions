import { convertMultiLineFileToDoubleArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
export default async function getArrayOfRowsOfValues() {
  return await convertMultiLineFileToDoubleArray(
    "./challengeInput.txt",
    "\t",
  );
}
