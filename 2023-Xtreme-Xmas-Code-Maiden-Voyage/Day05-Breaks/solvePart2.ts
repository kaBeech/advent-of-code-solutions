import { parseInput } from "./parseInput.ts";
import { Almanac } from "./types.ts";

export const solvePart2 = (async (): Promise<number> => {
  const almanac: Almanac = await parseInput();
  const rawLocations = almanac.seedMaps[almanac.seedMaps.length - 1];
  // Get the rawLocation with the lowest destinationRangeStart
  let lowestDestinationRangeStart = Infinity;
  rawLocations.forEach((rawLocation) => {
    if (rawLocation.destinationRangeStart < lowestDestinationRangeStart) {
      lowestDestinationRangeStart = rawLocation.destinationRangeStart;
    }
  });

  let seedFound = false;
  let currentLocation = 0;
  while (currentLocation < lowestDestinationRangeStart && !seedFound) {
    let seed = currentLocation;
    let currentSeedMapIndex = almanac.seedMaps.length - 1;
    let lowestRangeLength = Infinity;
    while (currentSeedMapIndex >= 0) {
      const currentSeedMap = almanac.seedMaps[currentSeedMapIndex];
      let seedMapProcessed = false;

      currentSeedMap.forEach((seedMapLine) => {
        if (
          seed >= seedMapLine.destinationRangeStart &&
          seed <
            seedMapLine.destinationRangeStart + seedMapLine.rangeLength &&
          !seedMapProcessed
        ) {
          seed = seed + seedMapLine.sourceRangeStart -
            seedMapLine.destinationRangeStart;
          if (seedMapLine.rangeLength < lowestRangeLength) {
            lowestRangeLength = seedMapLine.rangeLength;
          }
          seedMapProcessed = true;
        }
      });
      currentSeedMapIndex--;
    }
    if (
      (seed >= almanac.seeds[0] &&
        seed <= almanac.seeds[0] + almanac.seeds[1] - 1) ||
      (seed >= almanac.seeds[2] &&
        seed <= almanac.seeds[2] + almanac.seeds[3] - 1)
    ) {
      seedFound = true;
    } else {
      currentLocation += lowestRangeLength;
    }
  }

  const closestLocation = currentLocation;
  console.log(
    `Part 2: The lowest location number that corresponds to any of the initial seed numbers is ${closestLocation}`,
  );

  return closestLocation;
})();
