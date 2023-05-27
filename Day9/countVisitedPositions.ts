import { convertMultiLineFileToArray } from "../tools/conversionFunctions/convertFileToArray.ts";

let total = 0;

const countVisitedPositions = async (input: string): Promise<number> => {
  total = 0;

  const inputStringArray = await convertMultiLineFileToArray(input) as string[];

  console.log(inputStringArray);

  return total;
};

export { countVisitedPositions };
