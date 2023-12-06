import {
  convertMultiParagraphFileToArray,
} from "../../tools/conversionFunctions/convertFileToArray.ts";
import { Almanac, SeedMap, SeedMapLine } from "./types.ts";

export const parseInputPart2 = async (): Promise<Almanac> => {
  const almanacRaw: string[][] = await convertMultiParagraphFileToArray(
    "./testInput.txt",
  );
  let rawSeedData = almanacRaw.shift()![0].trim().split(`:`)[1].split(` `);
  rawSeedData = rawSeedData.filter((data) => !isNaN(+data));
  const seeds: number[] = [];
  let i = +rawSeedData[0];
  while (i <= +rawSeedData[1]) {
    seeds.push(i);
    i++;
  }
  i = +rawSeedData[2];
  while (i <= +rawSeedData[3]) {
    seeds.push(i);
    i++;
  }

  const almanac: Almanac = {
    seeds,
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
