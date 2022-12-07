import { convertMultiLineFileToArray } from "../../tools/conversionFunctions.ts";

let total = 0;

const boilerplateFunction = async (input: string) => {
  const inputStringArray = await convertMultiLineFileToArray(input) as string[];

  total = 0;

  return total;
};

export { boilerplateFunction };
