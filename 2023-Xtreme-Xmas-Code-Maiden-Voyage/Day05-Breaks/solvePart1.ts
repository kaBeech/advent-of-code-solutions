import { parseInput } from "./parseInput.ts";
import { Almanac } from "./types.ts";

export const solvePart1 = (async (): Promise<number> => {
  const almanac: Almanac = await parseInput();

  const result: number = 0;

  console.log(
    `Part 1: The lowest location number that corresponds to any of the initial seed numbers is ${result}`,
  );

  return result;
})();
