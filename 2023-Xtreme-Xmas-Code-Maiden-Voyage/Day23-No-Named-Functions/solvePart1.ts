import { XYCoordinates } from "../../tools/commonTypes.ts";

// Declate Types

interface Tile {
  coordinates: XYCoordinates;
  value: "#" | "." | "<" | ">" | "^" | "v";
  distanceFromStart: number;
  reachableTiles: XYCoordinates[];
}

interface TrailMap {
  tiles: Tile[];
}

interface Path {
  currentTileCoordinates: XYCoordinates;
  visitedTiles: XYCoordinates[];
}

// Parse Input

const inputFile = "./testInput.dat"

const inputLines = await Deno.readTextFile(inputFile).then((text: string) => text.trim().split("\n"));

const trailMap: TrailMap = {
  tiles: []
};

for (const [y, line] of inputLines.entries()) {
  for (const [x, value] of line.split("").entries()) {
    trailMap.tiles.push({
      coordinates: { x, y },
      value,
      distanceFromStart: 0,
      reachableTiles: []
    });
  }
}

export default (async function(): Promise<number> {
  const pathsToExplore: Path[] = [];
  pathsToExplore.push({ currentTileCoordinates: { x: 1, y: 0 }, visitedTiles: [] });

  while (pathsToExplore.length > 0) {
    let currentPath = pathsToExplore.pop()!
    const currentTile = trailMap.tiles.find(
      (t) =>
        t.coordinates.x === currentPath.currentTileCoordinates.x &&
        t.coordinates.y === currentPath.currentTileCoordinates.y
    )!;

    const { x, y } = currentTile.coordinates;
    const adjacentTiles = [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y - 1 },
      { x, y: y + 1 }
    ];

    for (const adjacentTileCoordinates of adjacentTiles) {
      if (adjacentTileCoordinates.x < 0 || adjacentTileCoordinates.y < 0 || adjacentTileCoordinates.x >= inputLines[0].length || adjacentTileCoordinates.y >= inputLines.length) {
        continue;
      }
      if (currentPath.visitedTiles.find((t) => t.x === adjacentTileCoordinates.x && t.y === adjacentTileCoordinates.y)) {
        continue;
      }
      const adjacentTile = trailMap.tiles.find(
        (t) =>
          t.coordinates.x === adjacentTileCoordinates.x && t.coordinates.y === adjacentTileCoordinates.y
      )!;
      if (adjacentTile.distanceFromStart > currentTile.distanceFromStart + 1) {
        continue;
      }
      if (adjacentTile.distanceFromStart < currentTile.distanceFromStart + 1) {
      }
      const nextPath = { currentTileCoordinates: adjacentTileCoordinates, visitedTiles: [...currentPath.visitedTiles, currentTile.coordinates] };
      switch (adjacentTile.value) {
        case "#":
          break;
        case ".":
          adjacentTile.distanceFromStart = currentTile.distanceFromStart + 1;
          pathsToExplore.push(nextPath);
          break;
        case "<":
          if (adjacentTileCoordinates.x <= x) {
            adjacentTile.distanceFromStart = currentTile.distanceFromStart + 1;
            pathsToExplore.push(nextPath);
          }
          break;
        case ">":
          if (adjacentTileCoordinates.x >= x) {
            adjacentTile.distanceFromStart = currentTile.distanceFromStart + 1;
            pathsToExplore.push(nextPath);
          }
          break;
        case "^":
          if (adjacentTileCoordinates.y <= y) {
            adjacentTile.distanceFromStart = currentTile.distanceFromStart + 1;
            pathsToExplore.push(nextPath);
          }
          break;
        case "v":
          if (adjacentTileCoordinates.y >= y) {
            adjacentTile.distanceFromStart = currentTile.distanceFromStart + 1;
            pathsToExplore.push(nextPath);
          }
          break;
        default:
          throw new Error(`Unexpected tile value: ${adjacentTile.value}`);
      }
    }
  }

  let endingNode = trailMap.tiles.find((t) => t.coordinates.x === inputLines[0].length - 2 && t.coordinates.y === inputLines.length - 1)!;

  console.log(JSON.stringify(endingNode));

  const longestHikeSteps = endingNode.distanceFromStart;

  // console.log(JSON.stringify(trailMap.tiles));

  console.log(`Part 1: The longest hike is ${longestHikeSteps} steps long`);

  return longestHikeSteps;
})();
