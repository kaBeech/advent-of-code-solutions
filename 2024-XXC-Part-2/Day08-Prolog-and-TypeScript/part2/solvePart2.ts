import parseInput from "./parseInput.ts";
import getUniqueNodes from "./getUniqueNodes.ts";
import { Antenna, AntennaMap } from "./types.ts";

export default (async function(): Promise<Antenna> {
  const antennaMap: AntennaMap = await parseInput();

  const uniqueNodes = getUniqueNodes(
    antennaMap,
  );

  console.log(`Part 2: How many unique locations within the bounds of the map contain an antinode? Answer: ${JSON.stringify(uniqueNodes.length)}`);

  return uniqueNodes.length;
})();
