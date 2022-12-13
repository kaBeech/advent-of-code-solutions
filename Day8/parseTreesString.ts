import { TreeMap } from "./types.ts";

const parseTreesString = async (treesFile: string) => {

  const treesString = await Deno.readTextFile(treesFile);
  const treesStringTrimmed = treesString.trimEnd();
  treesStringTrimmed.split(/\n/);
  
  return "test" as unknown as TreeMap;
};

export { parseTreesString };
