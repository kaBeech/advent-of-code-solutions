import {
  convertMultiLineFileToDoubleArray,
} from "../../tools/conversionFunctions/convertFileToArray.ts";
import { Tile } from "./Tile.ts";
import { TileMap, TileType } from "./types.ts";

const populateTileMap = async (challengeInput: string): Promise<TileMap> => {
  const tileMap = {
    map: [] as TileType[][],
    startTile: {} as TileType,
    endTile: {} as TileType,
  } as TileMap;
  const rawMap = await convertMultiLineFileToDoubleArray(challengeInput);
  rawMap.forEach((row, x) => {
    const tileRow = [] as TileType[];
    row.forEach((value, y) => {
      let elevation = value;
      if (value === "S") {
        elevation = "a";
      } else if (value === "E") {
        elevation = "z";
      }
      const tile = Tile({ x, y }, elevation, tileMap);
      if (value === "S") {
        tileMap.startTile = tile;
      } else if (value === "E") {
        tileMap.endTile = tile;
      }
      tileRow.push(tile);
    });
    tileMap.map.push(tileRow);
  });
  return tileMap;
};

export { populateTileMap };
