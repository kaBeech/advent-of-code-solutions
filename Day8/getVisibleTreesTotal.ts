import { convertMultiLineFileToArray } from "../tools/convertFileToArray.ts";

let total = 0;

const getVisibleTreesTotal = async (treeGridString: string) => {
  total = 0;

  const inputStringArray = await convertMultiLineFileToArray(treeGridString) as string[];

  console.log(inputStringArray)

  return total;
};

export { getVisibleTreesTotal };
