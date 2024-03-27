import { XYCoordinates } from "../../tools/commonTypes.ts";

// Declare Types

interface Tile {
  coordinates: XYCoordinates;
  value: "#" | "." | "<" | ">" | "^" | "v";
  adjacentTiles: XYCoordinates[];
  isNode: boolean;
}

interface TrailMap {
  tiles: Tile[];
}

interface Path {
  currentCoordinates: XYCoordinates;
  visitedCoordinates: XYCoordinates[];
  distance: number;
}

interface TrailNodeConnection {
  destination: XYCoordinates;
  distance: number;
}

interface TrailNode {
  coordinates: XYCoordinates;
  connections: TrailNodeConnection[];
}

// Parse Input

const inputFile = "./challengeInput.dat"

const inputLines = await Deno.readTextFile(inputFile).then((text: string) => text.trim().split("\n"));

const trailMap: TrailMap = {
  tiles: []
};

for (const [y, line] of inputLines.entries()) {
  for (const [x, value] of line.split("").entries()) {
    if (value !== "#") {
      trailMap.tiles.push({
        coordinates: { x, y },
        value,
        adjacentTiles: [],
        isNode: false,
      });
    }
  }
}

for (const tile of trailMap.tiles) {
  const { x, y } = tile.coordinates;
  const adjacentTiles = [
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 }
  ];

  for (const adjacentTileCoordinates of adjacentTiles) {

    // Skip paths that are shorter than the longest known path for the adjacent tile
    if (adjacentTileCoordinates.x < 0 || adjacentTileCoordinates.y < 0 || adjacentTileCoordinates.x >= inputLines[0].length || adjacentTileCoordinates.y >= inputLines.length) {
      continue;
    }

    const adjacentTile = trailMap.tiles.find(
      (tile) =>
        tile.coordinates.x === adjacentTileCoordinates.x && tile.coordinates.y === adjacentTileCoordinates.y
    );

    // Skip the coordinates if they're not in the trailMap
    if (!adjacentTile) {
      continue;
    }
    tile.adjacentTiles.push(adjacentTileCoordinates);
  }
}

// Mark forks in the trails as nodes
const trailNodes: TrailNode[] = [];
for (const tile of trailMap.tiles) {
  if (tile.adjacentTiles.length > 2) {
    tile.isNode = true;
    trailNodes.push({
      coordinates: tile.coordinates,
      connections: [],
    });
  }
}

// Add the starting node
const startingTile = trailMap.tiles.find((t) => t.coordinates.x === 1 && t.coordinates.y === 0)!;
startingTile.isNode = true;
trailNodes.push({
  coordinates: startingTile.coordinates,
  connections: [],
});

// Add the ending node
const endingTile = trailMap.tiles.find((t) => t.coordinates.x === inputLines[0].length - 2 && t.coordinates.y === inputLines.length - 1)!;
endingTile.isNode = true;
trailNodes.push({
  coordinates: endingTile.coordinates,
  connections: [],
});

// Map connections between nodes
for (const trailNode of trailNodes) {
  const { x, y } = trailNode.coordinates;
  const nodeTile = trailMap.tiles.find((t) => t.coordinates.x === x && t.coordinates.y === y)!;

  for (const connectionRouteStartingCoordinates of nodeTile.adjacentTiles) {
    const path = [trailNode.coordinates, connectionRouteStartingCoordinates];
    let connectionMapped = false
    let currentCoordinates = connectionRouteStartingCoordinates;

    while (!connectionMapped) {
      let currentTile = trailMap.tiles.find(
        (tile) =>
          tile.coordinates.x === currentCoordinates.x && tile.coordinates.y === currentCoordinates.y
      )!;
      if (currentTile.isNode) {
        trailNode.connections.push({
          destination: currentCoordinates,
          distance: path.length - 1,
        });
        connectionMapped = true;
      } else {
        const nextTileCoordinates = currentTile.adjacentTiles.find(
          (tile) =>
            tile.x !== path[path.length - 2].x || tile.y !== path[path.length - 2].y
        )!;
        path.push(nextTileCoordinates);
        currentCoordinates = nextTileCoordinates;
      }
    }
  }
}

export default (async function(): Promise<number> {

  let longestPath: Path | null = null;

  const pathsToExplore: Path[] = [];

  pathsToExplore.push({ currentCoordinates: startingTile.coordinates, visitedCoordinates: [startingTile.coordinates], distance: 0 });

  while (pathsToExplore.length > 0) {
    const currentPath = pathsToExplore.pop()!
    const currentNode = trailNodes.find(
      (node) =>
        node.coordinates.x === currentPath.currentCoordinates.x &&
        node.coordinates.y === currentPath.currentCoordinates.y
    )!;

    for (const connection of currentNode.connections) {
      const tileIsInVisitedCoordinates = currentPath.visitedCoordinates.find((node) => node.x === connection.destination.x && node.y === connection.destination.y);
      const destinationNode = trailNodes.find(
        (node) =>
          node.coordinates.x === connection.destination.x && node.coordinates.y === connection.destination.y
      )!;
      const nextPath = { currentCoordinates: connection.destination, visitedCoordinates: [...currentPath.visitedCoordinates, connection.destination], distance: currentPath.distance + connection.distance };
      const destinationIsEndingTile = destinationNode.coordinates === endingTile.coordinates;

      if (!tileIsInVisitedCoordinates) {
        if (!destinationIsEndingTile) {
          pathsToExplore.push(nextPath);
        } else if (!longestPath || nextPath.distance > longestPath.distance) {
          longestPath = nextPath;
        }
      }
    }
  }

  console.log(`Part 2: The longest hike is ${longestPath!.distance} steps long`);

  return longestPath!.distance;
})();
