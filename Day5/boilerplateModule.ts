import { convertMultiLineFileToArray } from "../tools/conversionFunctions.ts";

let total = 0;

const boilerplateFunction = async (input: string) => {
  total = 0;

  const inputStringArray = await convertMultiLineFileToArray(input) as string[];

  console.log(inputStringArray)

  return total;
};

export { boilerplateFunction };
