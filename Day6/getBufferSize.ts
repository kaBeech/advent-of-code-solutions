import { convertMultiLineFileToArray } from "../tools/conversionFunctions.ts";

let total = 0;

const getBufferSize = async (input: string) => {
  total = 0;

  const inputStringArray = await convertMultiLineFileToArray(input) as string[];

  console.log(inputStringArray)

  return total;
};

export { getBufferSize };
