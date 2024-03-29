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
        const rangeEnd = seedMapLine.destinationRangeStart +
          seedMapLine.rangeLength;
        if (
          seed <
            rangeEnd &&
          !seedMapProcessed
        ) {
          if (
            seedMapLine.destinationRangeStart - seed > 0 &&
            seedMapLine.destinationRangeStart - seed < lowestRangeLength
          ) {
            lowestRangeLength = seedMapLine.destinationRangeStart - seed;
          }
          if (
            seed >= seedMapLine.destinationRangeStart
          ) {
            const distanceFromRangeEnd = rangeEnd - seed;
            seed = seed + seedMapLine.sourceRangeStart -
              seedMapLine.destinationRangeStart;
            if (distanceFromRangeEnd < lowestRangeLength) {
              lowestRangeLength = distanceFromRangeEnd;
            }
            seedMapProcessed = true;
          }
        }
      });
      currentSeedMapIndex--;
    }
    console.log(currentLocation, ", ", seed, ", ", lowestRangeLength);
    for (let i = 0; i < almanac.seeds.length && !seedFound; i += 2) {
      if (
        seed >= almanac.seeds[i] &&
        seed <= almanac.seeds[i] + almanac.seeds[i + 1] - 1
      ) {
        seedFound = true;
      }
    }
    if (
      !seedFound
    ) {
      currentLocation += lowestRangeLength;
    }
  }

  const closestLocation = currentLocation;
  console.log(
    `Part 2: The lowest location number that corresponds to any of the initial seed numbers is ${closestLocation}`,
  );

  return closestLocation;
})();
