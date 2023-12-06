import { parseInputPart2 } from "./parseInputPart2.ts";
import { Almanac } from "./types.ts";

export const solvePart2 = (async (): Promise<number> => {
  const almanac: Almanac = await parseInputPart2();
  const locations: number[] = [];

  almanac.seeds.forEach((seed) => {
    almanac.seedMaps.forEach((seedMap) => {
      let seedMapProcessed = false;
      seedMap.forEach((seedMapLine) => {
        if (
          seed >= seedMapLine.sourceRangeStart &&
          seed < seedMapLine.sourceRangeStart + seedMapLine.rangeLength &&
          !seedMapProcessed
        ) {
          seed = seed + seedMapLine.destinationRangeStart -
            seedMapLine.sourceRangeStart;
          seedMapProcessed = true;
        }
      });
    });
    locations.push(seed);
  });

  const closestLocation: number = Math.min(...locations);
  console.log(
    `Part 2: The lowest location number that corresponds to any of the initial seed numbers is ${closestLocation}`,
  );

  return closestLocation;
})();
