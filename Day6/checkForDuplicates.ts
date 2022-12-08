let bufferSize = 0;

const checkForDuplicates = async (datastreamFile: string) => {
  
  const datastreamString = await Deno.readTextFile(datastreamFile);
  const datastreamArray = datastreamString.split("");
  let heldArray: string[] = []
  bufferSize = 4

  const first4Characters = datastreamArray.splice(0, 4);
  heldArray = heldArray.concat(first4Characters);

  console.log(datastreamArray)

  return bufferSize;
};

export { checkForDuplicates };
