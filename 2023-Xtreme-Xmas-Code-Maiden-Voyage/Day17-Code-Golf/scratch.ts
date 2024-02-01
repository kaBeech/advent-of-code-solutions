import { convertMultiLineFileToDoubleArray } from "../../tools/conversionFunctions/convertFileToArray.ts";

interface Route {
  distanceFromLavaPool: number;
  straightLine: string;
  path: {
    x: number;
    y: number;
  }[];
}

interface CityBlock {
  heatLoss: number;
  shortestRoute: Route;
  routesByDirection: {
    N: Route;
    E: Route;
    S: Route;
    W: Route;
  };
  coordinates: {
    x: number;
    y: number;
  };
}

interface Node {
  block: CityBlock;
  route: Route;
  totalHeatLoss: number;
}

const pseudoSolvePart1 = async (): Promise<number> => {
  const cityMap = await parseInput();
  const lavaPool = cityMap[0][0];
  const machinePartsFactory =
    cityMap[cityMap.length - 1][cityMap[0].length - 1];
  const nodesToVisit = [
    {
      block: cityMap[0][1],
      totalHeatLoss: cityMap[0][1].heatLoss,
      route: {
        distanceFromLavaPool: cityMap[0][1].heatLoss,
        straightLine: "E",
        path: [{ x: 0, y: 0 }],
      },
    },
    {
      block: cityMap[1][0],
      totalHeatLoss: cityMap[1][0].heatLoss,
      route: {
        distanceFromLavaPool: cityMap[1][0].heatLoss,
        straightLine: "S",
        path: [{ x: 0, y: 0 }],
      },
    },
  ];

  while (nodesToVisit.length > 0) {
    const currentNode = nodesToVisit.shift()!;
    const neighbors = getNeighbors(currentNode, cityMap);

    for (const rawNeighbor of neighbors) {
      const neighbor = rawNeighbor.block;
      const straightLine = calculateStraightLine(currentNode, neighbor);
      const direction = straightLine[0] as "N" | "E" | "S" | "W";

      neighbor.routesByDirection[direction] = compareDistance(
        currentNode,
        neighbor,
        rawNeighbor.route,
        machinePartsFactory.shortestRoute.distanceFromLavaPool,
        nodesToVisit,
        straightLine,
      );
    }
  }

  const lowestPossibleHeatLoss =
    machinePartsFactory.shortestRoute.distanceFromLavaPool;

  console.log(machinePartsFactory.shortestRoute.path);

  console.log(
    `Part 1: The lowest possible heat loss is ${lowestPossibleHeatLoss}.`,
  );

  return lowestPossibleHeatLoss;
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
        shortestRoute: {
          distanceFromLavaPool: Infinity,
          straightLine: "",
          path: [],
        },
        routesByDirection: {
          N: {
            distanceFromLavaPool: Infinity,
            straightLine: "",
            path: [],
          },
          E: {
            distanceFromLavaPool: Infinity,
            straightLine: "",
            path: [],
          },
          S: {
            distanceFromLavaPool: Infinity,
            straightLine: "",
            path: [],
          },
          W: {
            distanceFromLavaPool: Infinity,
            straightLine: "",
            path: [],
          },
        },
        coordinates: { x, y },
      });
      x++;
    }
    cityMap.push(cityRow);
    y++;
  }
  return cityMap;
};

const getNeighbors = (currentNode: Node, cityMap: CityBlock[][]) => {
  const neighbors: Node[] = [];
  const { x, y } = currentNode.block.coordinates;

  if (y > 0 && currentNode.route.straightLine[0] !== "S") {
    neighbors.push({
      block: cityMap[y - 1][x],
      route: cityMap[y - 1][x].routesByDirection.N,
    });
  }
  if (
    x < cityMap[0].length - 1 &&
    currentNode.route.straightLine[0] !== "W"
  ) {
    neighbors.push({
      block: cityMap[y][x + 1],
      route: cityMap[y][x + 1].routesByDirection.E,
    });
  }
  if (
    y < cityMap.length - 1 && currentNode.route.straightLine[0] !== "N"
  ) {
    neighbors.push({
      block: cityMap[y + 1][x],
      route: cityMap[y + 1][x].routesByDirection.S,
    });
  }
  if (x > 0 && currentNode.route.straightLine[0] !== "E") {
    neighbors.push({
      block: cityMap[y][x - 1],
      route: cityMap[y][x - 1].routesByDirection.W,
    });
  }
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
  const prospectiveNeighborDistance = currentNode.route.distanceFromLavaPool +
    neighbor.heatLoss;
  const comparedDistance = comparedRoute.distanceFromLavaPool;
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
    comparedRoute.distanceFromLavaPool = prospectiveNeighborDistance;
    comparedRoute.straightLine = straightLine;
    comparedRoute.path = currentNode.route.path
      .concat(
        currentNode.block.coordinates,
      );
    if (
      prospectiveNeighborDistance <=
        neighbor.shortestRoute.distanceFromLavaPool
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
      console.log(currentNode.route.distanceFromLavaPool);
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
