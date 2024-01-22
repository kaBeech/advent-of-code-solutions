import { convertMultiLineFileToDoubleArray } from "../../tools/conversionFunctions/convertFileToArray.ts";

interface CityBlock {
  visited: boolean;
  heatLoss: number;
  distanceFromLavaPool: number;
  straightLine: string;
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
        heatLoss: +rawCityBlock,
        distanceFromLavaPool: Infinity,
        straightLine: "",
        coordinates: { x, y },
      });
      x++;
    }
    cityMap.push(cityRow);
    y++;
  }
  return cityMap;
};

const calculateStraightLine = (currentNode: CityBlock, neighbor: CityBlock) => {
  let straightLine = currentNode.straightLine;
  let currentDirection = "";
  if (neighbor.coordinates.y < currentNode.coordinates.y) {
    currentDirection = "N";
  } else if (neighbor.coordinates.x > currentNode.coordinates.x) {
    currentDirection = "E";
  } else if (neighbor.coordinates.y > currentNode.coordinates.y) {
    currentDirection = "S";
  } else {
    currentDirection = "W";
  }
  if (currentDirection === straightLine[0]) {
    straightLine += currentDirection;
  } else {
    straightLine = currentDirection;
  }
  return straightLine;
};

const pseudoSolvePart1 = async (): Promise<number> => {
  const cityMap = await parseInput();
  const lavaPool = cityMap[0][0];
  const machinePartsFactory =
    cityMap[cityMap.length - 1][cityMap[0].length - 1];
  let currentNode = lavaPool;
  currentNode.distanceFromLavaPool = 0;
  const unvisitedBlocks = cityMap.flat();
  while (!machinePartsFactory.visited) {
    const unvisitedNeighbors = unvisitedBlocks.filter((cityBlock) =>
      cityBlock.coordinates.y - currentNode.coordinates.y <= 1 &&
      cityBlock.coordinates.x - currentNode.coordinates.x <= 1
    );
    for (const neighbor of unvisitedNeighbors) {
      const straightLine = calculateStraightLine(currentNode, neighbor);
      if (
        currentNode.distanceFromLavaPool + neighbor.heatLoss <
          neighbor.distanceFromLavaPool && straightLine.length < 4
      ) {
        neighbor.distanceFromLavaPool = currentNode.distanceFromLavaPool +
          neighbor.heatLoss;
        neighbor.straightLine = straightLine;
      }
    }
    currentNode.visited = true;
    unvisitedBlocks.splice(unvisitedBlocks.indexOf(currentNode), 1);
    currentNode = unvisitedBlocks.reduce((a, b) =>
      a.distanceFromLavaPool < b.distanceFromLavaPool ? a : b
    );
  }

  const lowestPossibleHeatLoss = machinePartsFactory.distanceFromLavaPool;

  console.log(
    `Part 1: The lowest possible heat loss is ${lowestPossibleHeatLoss}.`,
  );

  return lowestPossibleHeatLoss;
};

export default (function (): Promise<number> {
  const result = pseudoSolvePart1();

  return result;
})();
