import {
  convertMultiParagraphFileToArray,
} from "../../tools/conversionFunctions/convertFileToArray.ts";
import { Almanac, SeedMap, SeedMapLine } from "./types.ts";

export const parseInput = async (): Promise<Almanac> => {
  const almanacRaw: string[][] = await convertMultiParagraphFileToArray(
    "./challengeInput.txt",
  );
  const almanac: Almanac = {
    seeds: almanacRaw.shift()![0].trim().split(`:`)[1].split(` `).map((
      seed,
    ) => parseInt(seed)),
    seedMaps: [],
  };
  almanacRaw.forEach((rawSeedMap) => {
    const seedMap: SeedMap = [];
    rawSeedMap.shift();
    rawSeedMap.forEach((rawSeedMapLine) => {
      const seedMapLineArray: string[] = rawSeedMapLine.trim().split(` `);
      const seedMapLine: SeedMapLine = {
        destinationRangeStart: +seedMapLineArray[0],
        sourceRangeStart: +seedMapLineArray[1],
        rangeLength: +seedMapLineArray[2],
      };
      seedMap.push(seedMapLine);
    });
    almanac.seedMaps.push(seedMap);
  });
  almanac.seeds = almanac.seeds.filter((seed) => !isNaN(seed));
  return almanac;
};
