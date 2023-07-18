import {
  convertMultiLineFileToDoubleArray,
} from "../../tools/conversionFunctions/convertFileToArray.ts";
import { convertLowercaseLetterToNumber } from "../../tools/conversionFunctions/convertLetterToNumber.ts";
import { Tile } from "./Tile.ts";
import { TileMap, TileType } from "./types.ts";

const populateTileMap = async (challengeInput: string): Promise<TileMap> => {
  const tileMap = {
    allTiles: [] as TileType[][],
    startTile: {} as TileType,
    endTile: {} as TileType,
  } as TileMap;
  const rawMap = await convertMultiLineFileToDoubleArray(challengeInput);
  rawMap.forEach((row, y) => {
    const tileRow = [] as TileType[];
    row.forEach((value, x) => {
      let elevation = -1;
      if (value === "S") {
        elevation = 1;
      } else if (value === "E") {
        elevation = 26;
      } else {
        elevation = convertLowercaseLetterToNumber(value);
      }
      const tile = Tile({ x, y }, elevation);
      // Start from the End, work towards the Start
      if (value === "E") {
        tileMap.endTile = tile;
      } else if (value === "S") {
        tileMap.startTile = tile;
      }
      tileRow.push(tile);
    });
    tileMap.allTiles.push(tileRow);
  });
  return tileMap;
};

export { populateTileMap };
