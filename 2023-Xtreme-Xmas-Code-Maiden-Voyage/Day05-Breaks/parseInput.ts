import {
  convertMultiLineFileToArray,
  convertMultiParagraphFileToArray,
} from "../../tools/conversionFunctions/convertFileToArray.ts";
import { Almanac } from "./types.ts";

export const parseInput = async (): Promise<Almanac> => {
  const almanacRaw: string[][] = await convertMultiParagraphFileToArray(
    "./testInput.txt",
  );
  console.log(almanacRaw);
  const almanac: Almanac = {
    seeds: almanacRaw.shift()![0].trim().split(`:`)[1].split(` `).map((
      seed,
    ) => parseInt(seed)),
    seedMaps: almanacRaw,
  };
  almanac.seeds = almanac.seeds.filter((seed) => !isNaN(seed));
  console.log(almanac);
  return {
    seeds: almanacRaw[0].map((seed) => parseInt(seed)),
    seedMaps: almanacRaw,
  };
};
