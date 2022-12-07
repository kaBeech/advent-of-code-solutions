import { convertMultiLineFileToArray } from "../tools/conversionFunctions.ts";

let total = 0;

const getDuplicateAssignmentsTotal = async (input: any) => {
  if (typeof (input) === "string") {
    input = await convertMultiLineFileToArray(input) as any[];
  }

  total = 0;

  return total;
};

export { getDuplicateAssignmentsTotal };
