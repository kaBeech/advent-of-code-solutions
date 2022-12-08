import { convertMultiLineFileToArray } from "../tools/conversionFunctions.ts";

let topCrateString = "";

const getTopCrates = async (input: string) => {
  topCrateString = "";

  const inputStringArray = await convertMultiLineFileToArray(input) as string[];

  console.log(inputStringArray)

  return topCrateString;
};

export { getTopCrates };
