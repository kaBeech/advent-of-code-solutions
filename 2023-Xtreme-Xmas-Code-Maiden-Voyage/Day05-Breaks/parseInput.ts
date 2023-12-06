import {
  convertMultiLineFileToArray,
  convertMultiParagraphFileToArray,
} from "../../tools/conversionFunctions/convertFileToArray.ts";
import { Almanac } from "./types.ts";

export const parseInput = async (): Promise<Almanac> => {
  const almanacString: string[][] = await convertMultiParagraphFileToArray(
    "./testInput.txt",
  );
  console.log(almanacString);
  const almanac: Almanac = {
    seeds: almanacString.shift()![0].trim().split(`:`)[1].split(` `).map((
      seed,
    ) => parseInt(seed)),
    seedMaps: almanacString,
  };
  almanac.seeds = almanac.seeds.filter((seed) => !isNaN(seed));
  console.log(almanac);
  return {
    seeds: almanacString[0].map((seed) => parseInt(seed)),
    seedMaps: almanacString,
  };
};
