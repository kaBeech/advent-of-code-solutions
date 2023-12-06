import { parseInput } from "./parseInput.ts";
import { Almanac } from "./types.ts";

export const solvePart1 = (async (): Promise<number> => {
  const almanac: Almanac = await parseInput();
  const locations: number[] = [];

  almanac.seeds.forEach((seed) => {
    almanac.seedMaps.forEach((seedMap) => {
      let seedMapProcessed = false;
      seedMap.forEach((seedMapLine) => {
        console.log(seed, seedMapLine);
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

  console.log(locations);

  const closestLocation: number = Math.min(...locations);
  console.log(
    `Part 1: The lowest location number that corresponds to any of the initial seed numbers is ${closestLocation}`,
  );

  return closestLocation;
})();
