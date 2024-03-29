import { TileType } from "./types.ts";

export { getAdjacentTiles };

const getAdjacentTiles = (allTiles: TileType[][], x: number, y: number) => {
  const adjacentCoordinates = [[x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]];
  const adjacentTiles: TileType[] = [];

  adjacentCoordinates.forEach(([x, y]) => {
    if (x >= 0 && y >= 0 && x < allTiles[0].length && y < allTiles.length) {
      adjacentTiles.push(allTiles[y][x]);
    }
  });
  return adjacentTiles;
};
