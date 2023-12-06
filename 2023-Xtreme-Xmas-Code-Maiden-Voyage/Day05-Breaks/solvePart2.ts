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

  const magicNumber = 69;
  let seedFound = false;
  let currentLocation = 0;
  while (currentLocation < lowestDestinationRangeStart && !seedFound) {
    let seed = currentLocation;
    let currentSeedMapIndex = almanac.seedMaps.length - 1;
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
          seedMapProcessed = true;
        }
      });
      currentSeedMapIndex--;
    }
    if (seed === magicNumber) {
      seedFound = true;
    }
    currentLocation++;
  }

  const closestLocation = currentLocation;
  console.log(
    `Part 2: The lowest location number that corresponds to any of the initial seed numbers is ${closestLocation}`,
  );

  return closestLocation;
})();
