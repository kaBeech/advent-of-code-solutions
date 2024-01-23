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
}

const pseudoSolvePart1 = async (): Promise<number> => {
  const cityMap = await parseInput();
  const lavaPool = cityMap[0][0];
  const machinePartsFactory =
    cityMap[cityMap.length - 1][cityMap[0].length - 1];
  let currentNode: Node = {
    block: lavaPool,
    route: { distanceFromLavaPool: 0, straightLine: "", path: [] },
  };
  currentNode.route.distanceFromLavaPool = 0;
  const nodesToVisit = getNeighbors(currentNode, cityMap);
  while (nodesToVisit.length > 0) {
    const neighbors = getNeighbors(currentNode, cityMap);
    for (const rawNeighbor of neighbors) {
      const neighbor = rawNeighbor.block;
      const straightLine = calculateStraightLine(currentNode, neighbor);
      switch (straightLine[0]) {
        case "N":
          compareDistance(
            currentNode,
            neighbor,
            neighbor.routesByDirection.N,
            machinePartsFactory.shortestRoute.distanceFromLavaPool,
            nodesToVisit,
            straightLine,
          );
          break;
        case "E":
          compareDistance(
            currentNode,
            neighbor,
            neighbor.routesByDirection.E,
            machinePartsFactory.shortestRoute.distanceFromLavaPool,
            nodesToVisit,
            straightLine,
          );
          break;
        case "S":
          compareDistance(
            currentNode,
            neighbor,
            neighbor.routesByDirection.S,
            machinePartsFactory.shortestRoute.distanceFromLavaPool,
            nodesToVisit,
            straightLine,
          );
          break;
        case "W":
          compareDistance(
            currentNode,
            neighbor,
            neighbor.routesByDirection.W,
            machinePartsFactory.shortestRoute.distanceFromLavaPool,
            nodesToVisit,
            straightLine,
          );
          break;
        default:
          throw new Error("Invalid direction");
      }
    }
    nodesToVisit.splice(nodesToVisit.indexOf(currentNode), 1);
    if (nodesToVisit.length > 0) {
      currentNode = nodesToVisit.reduce((a, b) =>
        a.block.shortestRoute.distanceFromLavaPool <
            b.block.shortestRoute.distanceFromLavaPool
          ? a
          : b
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
  const prospectiveNeighborDistance = currentNode.route.distanceFromLavaPool +
    neighbor.heatLoss;
  const comparedDistance = comparedRoute.distanceFromLavaPool;
  // console.log(
  //   `prospectiveNeighborDistance: ${prospectiveNeighborDistance}, comparedDistance: ${comparedDistance}`,
  // );
  if (
    prospectiveNeighborDistance <
          shortestRouteDistance &&
      (prospectiveNeighborDistance <
          comparedDistance &&
        straightLine.length < 4) ||
    (prospectiveNeighborDistance ===
        comparedDistance &&
      straightLine.length <
        comparedRoute.straightLine.length)
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
  }
  return nodesToVisit;
};

export default (function (): Promise<number> {
  const result = pseudoSolvePart1();

  return result;
})();
