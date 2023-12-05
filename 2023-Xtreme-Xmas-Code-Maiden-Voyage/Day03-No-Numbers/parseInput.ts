import { convertMultiLineFileToDoubleArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { convertSingleDigitNumberToPseudoNumberString } from "../../tools/conversionFunctions/convertNumberToPseudoNumber.ts";
import { PseudoNumber, Tile, TileMap, TileValue } from "./types.ts";

export const parseInput = async (): Promise<TileMap> => {
  const rawTileMap: string[][] = await convertMultiLineFileToDoubleArray(
    "./testInput.txt",
  );
  const tileMap: TileMap = [];
  rawTileMap.forEach((rawTileRow, index) => {
    const tileMapRow: Tile[] = [];
    rawTileRow.forEach((rawTile, index2) => {
      let value: TileValue;
      if (!Number.isNaN(+rawTile)) {
        value = convertSingleDigitNumberToPseudoNumberString(
          +rawTile,
        ) as PseudoNumber;
      } else if (rawTile === ".") {
        value = ".";
      } else {
        value = "X";
      }
      tileMapRow.push({
        value,
        coordinates: { x: index2, y: index },
      });
    });
  });
  return tileMap;
};
