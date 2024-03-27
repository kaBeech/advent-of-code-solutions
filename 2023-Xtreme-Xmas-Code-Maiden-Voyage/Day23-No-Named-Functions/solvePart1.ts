import { XYCoordinates } from "../../tools/commonTypes.ts";

interface Tile {
  coordinates: XYCoordinates;
  value: "#" | "." | "<" | ">" | "^" | "v";
  reachableTiles: XYCoordinates[];
}

interface TrailMap {
  tiles: Tile[];
}

const inputFile = "./challengeInput.dat"

const inputLines = await Deno.readTextFile(inputFile).then((text: string) => text.trim().split("\n"));

const trailMap: TrailMap = {
  tiles: []
};

for (const [y, line] of inputLines.entries()) {
  for (const [x, value] of line.split("").entries()) {
    trailMap.tiles.push({
      coordinates: { x, y },
      value,
      reachableTiles: []
    });
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

  for (const adjacentTile of adjacentTiles) {
    if (adjacentTile.x < 0 || adjacentTile.y < 0 || adjacentTile.x >= inputLines[0].length || adjacentTile.y >= inputLines.length) {
      continue;
    }
    const adjacentTileValue = trailMap.tiles.find(
      (t) =>
        t.coordinates.x === adjacentTile.x && t.coordinates.y === adjacentTile.y
    )?.value;
    console.count(`${adjacentTile.x}-${adjacentTile.y}`);

    switch (adjacentTileValue) {
      case "#":
        break;
      case ".":
        tile.reachableTiles.push(adjacentTile);
        break;
      case "<":
        if (adjacentTile.x === x - 1) {
          tile.reachableTiles.push(adjacentTile);
        }
        break;
      case ">":
        if (adjacentTile.x === x + 1) {
          tile.reachableTiles.push(adjacentTile);
        }
        break;
      case "^":
        if (adjacentTile.y === y - 1) {
          tile.reachableTiles.push(adjacentTile);
        }
        break;
      case "v":
        if (adjacentTile.y === y + 1) {
          tile.reachableTiles.push(adjacentTile);
        }
        break;
      default:
        throw new Error(`Unexpected tile value: ${adjacentTileValue}`);
    }
  }
}

export default (async function(): Promise<number> {

  const longestHikeSteps = 0

  // console.log(JSON.stringify(trailMap.tiles));

  console.log(`Part 1: The longest hike is ${longestHikeSteps} steps long`);

  return longestHikeSteps;
})();
