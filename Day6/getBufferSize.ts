import { checkForDuplicates } from "./checkForDuplicates.ts";

let bufferSize = 0;

const getBufferSize = async (
  datastreamFile: string,
  dataMethod: "packet" | "message",
) => {
  const datastreamString = await Deno.readTextFile(datastreamFile);
  const datastreamArray = datastreamString.split("");
  let heldArray: string[] = [];

  if (dataMethod == "packet") {
    bufferSize = 4;
    const first4Characters = datastreamArray.splice(0, 4);
    heldArray = heldArray.concat(first4Characters);
  } else {
    bufferSize = 14;
    const first14Characters = datastreamArray.splice(0, 14);
    heldArray = heldArray.concat(first14Characters);
  }

  while (checkForDuplicates(heldArray)) {
    bufferSize += 1;
    heldArray.shift();
    heldArray.push(datastreamArray.shift() as string);
  }

  return bufferSize;
};

export { getBufferSize };
