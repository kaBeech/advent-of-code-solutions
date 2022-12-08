import { convertMultiLineFileToArray } from "../tools/conversionFunctions.ts";

let total = 0;

const getBufferSize = async (datastreamFile: string) => {
  
  const datastreamString = await Deno.readTextFile(datastreamFile);
  const datastreamArray = datastreamString.split("");
  let heldArray: string[] = []
  total = 4

  const first4Characters = datastreamArray.splice(0, 4);
  heldArray = heldArray.concat(first4Characters);

  console.log(datastreamArray)

  return total;
};

export { getBufferSize };
