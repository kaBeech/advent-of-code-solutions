import { convertMultiLineFileToDoubleArray } from "../../tools/conversionFunctions/convertFileToArray.ts";

interface CityBlock {
  visited: boolean;
  heatLoss: number;
  distanceFromLavaPool: number;
  coordinates: {
    x: number;
    y: number;
  };
}

const parseInput = async (): Promise<CityBlock[][]> => {
  const cityMap: CityBlock[][] = [];
  const cityMapString = await convertMultiLineFileToDoubleArray(
    "./testInput.dat",
  );
  let y = 0;
  for (const rawCityRow of cityMapString) {
    const cityRow: CityBlock[] = [];
    let x = 0;
    for (const rawCityBlock of rawCityRow) {
      cityRow.push({
        visited: false,
        heatLoss: parseInt(rawCityBlock),
        distanceFromLavaPool: Infinity,
        coordinates: { x, y },
      });
      x++;
    }
    cityMap.push(cityRow);
    y++;
  }
  return cityMap;
};

const pseudoSolvePart1 = async (): Promise<number> => {
  const cityMap = await parseInput();
  let currentNode = cityMap[0][0];
  currentNode.distanceFromLavaPool = 0;
  return 0;
};

export default (function (): Promise<number> {
  const lowestPossibleHeatLoss = pseudoSolvePart1();

  console.log(
    `Part 1: The lowest possible heat loss is ${lowestPossibleHeatLoss}.`,
  );

  return lowestPossibleHeatLoss;
})();
