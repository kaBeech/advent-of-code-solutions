import { checkForDuplicates } from "./checkForDuplicates.ts";

let bufferSize = 0;

const getBufferSize = async (datastreamFile: string) => {
  
  const datastreamString = await Deno.readTextFile(datastreamFile);
  const datastreamArray = datastreamString.split("");
  let heldArray: string[] = []
  bufferSize = 4

  const first4Characters = datastreamArray.splice(0, 4);
  heldArray = heldArray.concat(first4Characters);

  while (checkForDuplicates(heldArray)) {
    bufferSize += 1;
    heldArray.shift();
    heldArray.push(datastreamArray.shift() as string)
  }

  return bufferSize;
};

export { getBufferSize };
