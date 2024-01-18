import { convertMultiLineFileToDoubleArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { Grid, Tile } from "./types.ts";

export const parseInput = async (): Promise<Grid> => {
  const contraption: Grid = [];
  const inputAsDoubleArray: string[][] =
    await convertMultiLineFileToDoubleArray(
      "./challengeInput.dat",
    );
  let yCoordinate = 0;
  for (const rawRow of inputAsDoubleArray) {
    let xCoordinate = 0;
    const row: Tile[] = [];
    for (const rawTile of rawRow) {
      let tileContains: Tile["contains"];
      switch (rawTile) {
        case `.`:
          tileContains = "empty space";
          break;
        case `/`:
          tileContains = "mirror slash";
          break;
        case `\\`:
          tileContains = "mirror backslash";
          break;
        case `|`:
          tileContains = "splitter vertical";
          break;
        case `-`:
          tileContains = "splitter horizontal";
          break;
        default:
          throw new Error(`Unknown tile type: ${rawTile}`);
      }
      row.push({
        coordinates: { x: xCoordinate, y: yCoordinate },
        contains: tileContains,
        isEnergized: false,
        isHalfProcessed: false,
        isFullyProcessed: false,
      });
      xCoordinate += 1;
    }
    contraption.push(row);
    yCoordinate += 1;
  }
  return contraption;
};
