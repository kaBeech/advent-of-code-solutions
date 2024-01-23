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

const compareDistance = (
  currentNode: CityBlock,
  neighbor: CityBlock,
  route: Route,
  shortestRouteDistance: number,
) => {
  const prospectiveNeighborDistance =
    currentNode.shortestRoute.distanceFromLavaPool +
    neighbor.heatLoss;
  const comparedDistance = route.distanceFromLavaPool;
  if (
    comparedDistance <
          shortestRouteDistance &&
      (prospectiveNeighborDistance <
          comparedDistance &&
        currentNode.shortestRoute.straightLine.length < 4) ||
    (prospectiveNeighborDistance ===
        comparedDistance &&
      currentNode.shortestRoute.straightLine.length <
        route.straightLine.length)
  ) {
    route.distanceFromLavaPool = prospectiveNeighborDistance;
    route.straightLine = currentNode.shortestRoute.straightLine;
    route.path = currentNode.shortestRoute.path
      .concat(
        currentNode.coordinates,
      );
    if (
      prospectiveNeighborDistance <
        neighbor.shortestRoute.distanceFromLavaPool
    ) {
      neighbor.shortestRoute = route;
    }
  }
};

const pseudoSolvePart1 = async (): Promise<number> => {
  const cityMap = await parseInput();
  const lavaPool = cityMap[0][0];
  const machinePartsFactory =
    cityMap[cityMap.length - 1][cityMap[0].length - 1];
  let currentNode = lavaPool;
  currentNode.shortestRoute.distanceFromLavaPool = 0;
  const nodesToVisit = getNeighbors(currentNode, cityMap);
  while (nodesToVisit.length > 0) {
    const neighbors = getNeighbors(currentNode, cityMap);
    for (const neighbor of neighbors) {
      const straightLine = calculateStraightLine(currentNode, neighbor);
      switch (straightLine[0]) {
        case "N":
          compareDistance(
            currentNode,
            neighbor,
            neighbor.routesByDirection.N,
            machinePartsFactory.shortestRoute.distanceFromLavaPool,
          );
          break;
        case "E":
          compareDistance(
            currentNode,
            neighbor,
            neighbor.routesByDirection.E,
            machinePartsFactory.shortestRoute.distanceFromLavaPool,
          );
          break;
        case "S":
          compareDistance(
            currentNode,
            neighbor,
            neighbor.routesByDirection.S,
            machinePartsFactory.shortestRoute.distanceFromLavaPool,
          );
          break;
        case "W":
          compareDistance(
            currentNode,
            neighbor,
            neighbor.routesByDirection.W,
            machinePartsFactory.shortestRoute.distanceFromLavaPool,
          );
          break;
        default:
          throw new Error("Invalid direction");
      }
    }
    currentNode = nodesToVisit.reduce((a, b) =>
      a.shortestRoute.distanceFromLavaPool <
          b.shortestRoute.distanceFromLavaPool
        ? a
        : b
    );
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

const getNeighbors = (currentNode: CityBlock, cityMap: CityBlock[][]) => {
  const neighbors: CityBlock[] = [];
  const { x, y } = currentNode.coordinates;
  if (y > 0 && currentNode.shortestRoute.straightLine[0] !== "S") {
    neighbors.push(cityMap[y - 1][x]);
  }
  if (
    x < cityMap[0].length - 1 &&
    currentNode.shortestRoute.straightLine[0] !== "W"
  ) {
    neighbors.push(cityMap[y][x + 1]);
  }
  if (
    y < cityMap.length - 1 && currentNode.shortestRoute.straightLine[0] !== "N"
  ) {
    neighbors.push(cityMap[y + 1][x]);
  }
  if (x > 0 && currentNode.shortestRoute.straightLine[0] !== "E") {
    neighbors.push(cityMap[y][x - 1]);
  }
  return neighbors;
};

const calculateStraightLine = (currentNode: CityBlock, neighbor: CityBlock) => {
  let straightLine = currentNode.shortestRoute.straightLine;
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

export default (function (): Promise<number> {
  const result = pseudoSolvePart1();

  return result;
})();
