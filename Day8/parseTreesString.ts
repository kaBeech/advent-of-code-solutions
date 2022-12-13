import { SingleDigitInteger } from "../tools/commonTypes.ts";
import Tree from "./Tree.ts";
import { TreeMap } from "./types.ts";

const parseTreesString = async (treesFile: string) => {
  const treesString = await Deno.readTextFile(treesFile);
  let columnCounter = 0;
  let rowCounter = 0;
  const trees = [];
  const treesStringTrimmed = treesString.trimEnd();
  
  for (const char of treesStringTrimmed) {
    if (char === "\n") {
      columnCounter = 0;
      rowCounter += 1;
    }
    if (char === "0" || (+char > 0 && +char < 10)) {
      const tree = Tree(columnCounter, rowCounter, +char as SingleDigitInteger);
      trees.push(tree);
      columnCounter += 1;
    }
  }

  return {
    trees,
    sideLength: columnCounter,
  } as unknown as TreeMap;
};

export { parseTreesString };
