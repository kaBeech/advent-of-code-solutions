import { Heap } from "npm:heap-js";

import { CardinalDirection, XYCoordinates } from "../../tools/commonTypes.ts";
import { convertMultiLineFileToDoubleArray } from "../../tools/conversionFunctions/convertFileToArray.ts";

interface CityBlock {
  heatLoss: number;
  minimumRouteHeatLoss: number;
  coordinates: XYCoordinates;
  finalNode?: Node;
}

interface NodeRecord {
  nodeHeatLoss: number;
  cumulativeHeatLoss: number;
  consecutiveStepsInSameDirection: number;
  coordinates: {
    x: number;
    y: number;
  };
}

interface Node {
  block: CityBlock;
  direction: CardinalDirection;
  consecutiveStepsInSameDirection: number;
  routeHeatLoss: number;
  visitedBlocks: XYCoordinates[];
  heatLossRecord: NodeRecord[];
}

const pseudoSolvePart1 = async (): Promise<number> => {
  const cityMap = await parseInput();
  // const lavaPool = cityMap[0][0];
  const machinePartsFactory =
    cityMap[cityMap.length - 1][cityMap[0].length - 1];
  const nodesToVisit = new Heap((a: Node, b: Node) =>
    a.routeHeatLoss - b.routeHeatLoss
  );
  nodesToVisit.push({
    block: cityMap[0][1],
    direction: "east",
    consecutiveStepsInSameDirection: 1,
    routeHeatLoss: cityMap[0][0].heatLoss + cityMap[0][1].heatLoss,
    visitedBlocks: [{ x: 0, y: 0 }],
    heatLossRecord: [{
      nodeHeatLoss: cityMap[0][1].heatLoss,
      cumulativeHeatLoss: cityMap[0][0].heatLoss + cityMap[0][1].heatLoss,
      consecutiveStepsInSameDirection: 1,
      coordinates: { x: 1, y: 0 },
    }],
  });
  nodesToVisit.push({
    block: cityMap[1][0],
    direction: "south",
    consecutiveStepsInSameDirection: 1,
    routeHeatLoss: cityMap[0][0].heatLoss + cityMap[1][0].heatLoss,
    visitedBlocks: [{ x: 0, y: 0 }],
    heatLossRecord: [{
      nodeHeatLoss: cityMap[1][0].heatLoss,
      cumulativeHeatLoss: cityMap[0][0].heatLoss + cityMap[1][0].heatLoss,
      consecutiveStepsInSameDirection: 1,
      coordinates: { x: 0, y: 1 },
    }],
  });

  while (nodesToVisit.length > 0) {
    const currentNode = nodesToVisit.pop()!;

    if (
      currentNode.block === machinePartsFactory
    ) {
      if (
        currentNode.routeHeatLoss < machinePartsFactory.minimumRouteHeatLoss
      ) {
        machinePartsFactory.finalNode = currentNode;
      }
      machinePartsFactory.minimumRouteHeatLoss = Math.min(
        currentNode.routeHeatLoss,
        machinePartsFactory.minimumRouteHeatLoss,
      );

      continue;
    }

    const neighbors = getNeighbors(currentNode, cityMap);

    for (const neighborNode of neighbors) {
      // Optimization possible in this if statement
      if (
        neighborNode && neighborNode.consecutiveStepsInSameDirection < 4 &&
        neighborNode.routeHeatLoss < machinePartsFactory.minimumRouteHeatLoss &&
        neighborNode.routeHeatLoss < 105 &&
        !currentNode.visitedBlocks.includes(neighborNode.block.coordinates)
      ) {
        if (
          neighborNode.block === machinePartsFactory
        ) {
          neighborNode.block.finalNode = currentNode;
        }
        neighborNode.block.minimumRouteHeatLoss = currentNode.routeHeatLoss +
          neighborNode.block.heatLoss;
        nodesToVisit.push(neighborNode);
      }
    }
  }

  const lowestPossibleHeatLoss = machinePartsFactory.minimumRouteHeatLoss;

  console.log(
    machinePartsFactory.finalNode,
    machinePartsFactory.minimumRouteHeatLoss,
  );

  console.log(
    `Part 1: The lowest possible heat loss is ${lowestPossibleHeatLoss}.`,
  );

  return lowestPossibleHeatLoss;
};

const getNeighbors = (currentNode: Node, cityMap: CityBlock[][]) => {
  const neighbors: Node[] = [];
  const { x, y } = currentNode.block.coordinates;
  const visitedBlocks = currentNode.visitedBlocks.slice();
  // const visitedBlocks = currentNode.visitedBlocks.slice();
  visitedBlocks.push(currentNode.block.coordinates);

  if (y > 0) {
    neighbors.push({
      block: cityMap[y - 1][x],
      direction: "north",
      consecutiveStepsInSameDirection: 1,
      routeHeatLoss: currentNode.routeHeatLoss + cityMap[y - 1][x].heatLoss,
      visitedBlocks,
      heatLossRecord: [
        ...currentNode.heatLossRecord,
        {
          nodeHeatLoss: cityMap[y - 1][x].heatLoss,
          cumulativeHeatLoss: currentNode.routeHeatLoss +
            cityMap[y - 1][x].heatLoss,
          consecutiveStepsInSameDirection: 1,
          coordinates: { x, y: y - 1 },
        },
      ],
    });
  }
  if (x < cityMap[0].length - 1) {
    neighbors.push({
      block: cityMap[y][x + 1],
      direction: "east",
      consecutiveStepsInSameDirection: 1,
      routeHeatLoss: currentNode.routeHeatLoss + cityMap[y][x + 1].heatLoss,
      visitedBlocks,
      heatLossRecord: [
        ...currentNode.heatLossRecord,
        {
          nodeHeatLoss: cityMap[y][x + 1].heatLoss,
          cumulativeHeatLoss: currentNode.routeHeatLoss +
            cityMap[y][x + 1].heatLoss,
          consecutiveStepsInSameDirection: 1,
          coordinates: { x: x + 1, y },
        },
      ],
    });
  }
  if (y < cityMap.length - 1) {
    neighbors.push({
      block: cityMap[y + 1][x],
      direction: "south",
      consecutiveStepsInSameDirection: 1,
      routeHeatLoss: currentNode.routeHeatLoss + cityMap[y + 1][x].heatLoss,
      visitedBlocks,
      heatLossRecord: [
        ...currentNode.heatLossRecord,
        {
          nodeHeatLoss: cityMap[y + 1][x].heatLoss,
          cumulativeHeatLoss: currentNode.routeHeatLoss +
            cityMap[y + 1][x].heatLoss,
          consecutiveStepsInSameDirection: 1,
          coordinates: { x, y: y + 1 },
        },
      ],
    });
  }
  if (x > 0) {
    neighbors.push({
      block: cityMap[y][x - 1],
      direction: "west",
      consecutiveStepsInSameDirection: 1,
      routeHeatLoss: currentNode.routeHeatLoss + cityMap[y][x - 1].heatLoss,
      visitedBlocks,
      heatLossRecord: [
        ...currentNode.heatLossRecord,
        {
          nodeHeatLoss: cityMap[y][x - 1].heatLoss,
          cumulativeHeatLoss: currentNode.routeHeatLoss +
            cityMap[y][x - 1].heatLoss,
          consecutiveStepsInSameDirection: 1,
          coordinates: { x: x - 1, y },
        },
      ],
    });
  }

  const directionNeighbor = neighbors.find(
    (neighbor) => neighbor.direction === currentNode.direction,
  );

  if (directionNeighbor) {
    directionNeighbor.consecutiveStepsInSameDirection =
      currentNode.consecutiveStepsInSameDirection + 1;
    directionNeighbor
      .heatLossRecord[
        directionNeighbor.heatLossRecord.length - 1
      ].consecutiveStepsInSameDirection =
        currentNode.consecutiveStepsInSameDirection + 1;
  }

  return neighbors;
};

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
        heatLoss: +rawCityBlock,
        minimumRouteHeatLoss: Infinity,
        coordinates: { x, y },
      });
      x++;
    }
    cityMap.push(cityRow);
    y++;
  }
  return cityMap;
};

export default (function (): Promise<number> {
  const result = pseudoSolvePart1();

  return result;
})();
