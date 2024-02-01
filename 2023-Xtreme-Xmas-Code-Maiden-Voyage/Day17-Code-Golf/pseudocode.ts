import { CardinalDirection } from "../../tools/commonTypes.ts";
import { convertMultiLineFileToDoubleArray } from "../../tools/conversionFunctions/convertFileToArray.ts";

interface CityBlock {
  heatLoss: number;
  minimumRouteHeatLoss: number;
  coordinates: {
    x: number;
    y: number;
  };
}

interface Node {
  block: CityBlock;
  direction: CardinalDirection;
  consecutiveStepsInSameDirection: number;
}

interface Neighbors {
  north: Node | null;
  east: Node | null;
  south: Node | null;
  west: Node | null;
}

const pseudoSolvePart1 = async (): Promise<number> => {
  const cityMap = await parseInput();
  const lavaPool = cityMap[0][0];
  const machinePartsFactory =
    cityMap[cityMap.length - 1][cityMap[0].length - 1];
  const nodesToVisit: Node[] = [
    {
      block: cityMap[0][1],
      direction: "east",
      consecutiveStepsInSameDirection: 1,
    },
    {
      block: cityMap[1][0],
      direction: "south",
      consecutiveStepsInSameDirection: 1,
    },
  ];

  while (nodesToVisit.length > 0) {
    const currentNode = nodesToVisit.shift()!;
    const neighbors = getNeighbors(currentNode, cityMap);

    if (
      currentNode.block === machinePartsFactory &&
      currentNode.route.currentHeatLoss <
        machinePartsFactory.minimumRouteHeatLoss
    ) {
      machinePartsFactory.minimumRouteHeatLoss =
        currentNode.route.currentHeatLoss;
      continue;
    }

    for (const rawNeighbor of neighbors) {
      const neighbor = rawNeighbor.block;
      const straightLine = calculateStraightLine(currentNode, neighbor);
      const direction = straightLine[0] as "N" | "E" | "S" | "W";

      neighbor.routesByDirection[direction] = compareDistance(
        currentNode,
        neighbor,
        rawNeighbor.route,
        machinePartsFactory.shortestRoute.currentHeatLoss,
        nodesToVisit,
        straightLine,
      );
    }
  }

  const lowestPossibleHeatLoss =
    machinePartsFactory.shortestRoute.currentHeatLoss;

  console.log(machinePartsFactory.shortestRoute.path);

  console.log(
    `Part 1: The lowest possible heat loss is ${lowestPossibleHeatLoss}.`,
  );

  return lowestPossibleHeatLoss;
};

const getNeighbors = (currentNode: Node, cityMap: CityBlock[][]) => {
  const neighbors: Neighbors = {
    north: null,
    east: null,
    south: null,
    west: null,
  };
  const { x, y } = currentNode.block.coordinates;

  if (y > 0) {
    neighbors.north = {
      block: cityMap[y - 1][x],
      direction: "north",
      consecutiveStepsInSameDirection: 1,
    };
  }
  if (x < cityMap[0].length - 1) {
    neighbors.east = {
      block: cityMap[y][x + 1],
      direction: "east",
      consecutiveStepsInSameDirection: 1,
    };
  }
  if (y < cityMap.length - 1) {
    neighbors.south = {
      block: cityMap[y + 1][x],
      direction: "south",
      consecutiveStepsInSameDirection: 1,
    };
  }
  if (x > 0) {
    neighbors.west = {
      block: cityMap[y][x - 1],
      direction: "west",
      consecutiveStepsInSameDirection: 1,
    };
  }

  neighbors[currentNode.direction]!.consecutiveStepsInSameDirection++;

  return neighbors;
};

const calculateStraightLine = (currentNode: Node, neighbor: CityBlock) => {
  let straightLine = currentNode.route.straightLine;
  let currentDirection = "";
  if (neighbor.coordinates.y < currentNode.block.coordinates.y) {
    currentDirection = "N";
  } else if (neighbor.coordinates.x > currentNode.block.coordinates.x) {
    currentDirection = "E";
  } else if (neighbor.coordinates.y > currentNode.block.coordinates.y) {
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

const compareDistance = (
  currentNode: Node,
  neighbor: CityBlock,
  comparedRoute: Route,
  shortestRouteDistance: number,
  nodesToVisit: Node[],
  straightLine: string,
) => {
  const comparedRouteOrig = { ...comparedRoute };
  const prospectiveNeighborDistance = currentNode.route.currentHeatLoss +
    neighbor.heatLoss;
  const comparedDistance = comparedRoute.currentHeatLoss;
  // console.log(
  //   `prospectiveNeighborDistance: ${prospectiveNeighborDistance}, comparedDistance: ${comparedDistance}`,
  // );
  if (
    prospectiveNeighborDistance <
      shortestRouteDistance &&
    straightLine.length < 4 &&
    (
      prospectiveNeighborDistance <
        comparedDistance ||
      straightLine.length <
        comparedRoute.straightLine.length
    )
  ) {
    comparedRoute.currentHeatLoss = prospectiveNeighborDistance;
    comparedRoute.straightLine = straightLine;
    comparedRoute.path = currentNode.route.path
      .concat(
        currentNode.block.coordinates,
      );
    if (
      prospectiveNeighborDistance <=
        neighbor.shortestRoute.currentHeatLoss
    ) {
      neighbor.shortestRoute = comparedRoute;
    }
    nodesToVisit.push({
      block: neighbor,
      route: comparedRoute,
    });
    if (
      prospectiveNeighborDistance <=
        comparedDistance
    ) {
      return comparedRoute;
    }
    if (
      currentNode.block.coordinates.x === 11 &&
      currentNode.block.coordinates.y === 11 && neighbor.coordinates.x === 11 &&
      neighbor.coordinates.y === 12
    ) {
      console.count("made it this far!");
      console.log(currentNode.route.currentHeatLoss);
    }
    const testArray = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
      { x: 5, y: 1 },
      { x: 5, y: 0 },
    ];
    if (
      comparedRoute.path.length === testArray.length &&
      comparedRoute.path.every((step, index) =>
        step.x === testArray[index].x && step.y === testArray[index].y
      )
    ) {
      console.count("PING!");
      console.log(
        nodesToVisit,
        nodesToVisit.length,
        currentNode.block.coordinates,
      );
    }
  }
  return comparedRouteOrig;
};

export default (function (): Promise<number> {
  const result = pseudoSolvePart1();

  return result;
})();

const _happyPath = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
  { x: 4, y: 1 },
  { x: 5, y: 1 },
  { x: 5, y: 0 },
  { x: 6, y: 0 },
  { x: 7, y: 0 },
  { x: 8, y: 0 },
  { x: 8, y: 1 },
  { x: 8, y: 2 },
  { x: 9, y: 2 },
  { x: 10, y: 2 },
  { x: 10, y: 3 },
  { x: 10, y: 4 },
  { x: 11, y: 4 },
  { x: 11, y: 5 },
  { x: 11, y: 6 },
  { x: 11, y: 7 },
  { x: 12, y: 7 },
  { x: 12, y: 8 },
  { x: 12, y: 9 },
  { x: 12, y: 10 },
  { x: 11, y: 10 },
  { x: 11, y: 11 },
  { x: 11, y: 12 },
  { x: 12, y: 12 },
];

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
