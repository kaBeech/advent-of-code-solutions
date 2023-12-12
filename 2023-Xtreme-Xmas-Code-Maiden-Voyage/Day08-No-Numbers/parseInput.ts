import { convertMultiParagraphFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { Maps } from "./types.ts";

export const parseInput = async (): Promise<Maps> => {
  const mapsRaw: string[][] = await convertMultiParagraphFileToArray(
    "./testInput.dat",
  );
  const maps: Maps = { directions: mapsRaw[0][0], instructions: [] };
  for (const instruction of mapsRaw[1]) {
    maps.instructions.push({
      id: instruction.slice(0, 3),
      l: instruction.slice(7, 10),
      r: instruction.slice(12, 15),
    });
  }
  return maps;
};
