import { convertMultiLineFileToArray } from "../tools/conversionFunctions.ts";

let total = 0;

const getTopCrates = async (input: string) => {
  total = 0;

  const inputStringArray = await convertMultiLineFileToArray(input) as string[];

  console.log(inputStringArray)

  return total;
};

export { getTopCrates };
