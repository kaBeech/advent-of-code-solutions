import { convertMultiLineFileToDoubleArray } from "../../tools/conversionFunctions/convertFileToArray.ts";

export interface CityBlock {
  heatLoss: number;
  distanceFromLavaPool: number;
  coordinates: {
    x: number;
    y: number;
  };
}

export const parseInput = async (): Promise<CityBlock[][]> => {
  const cityMap: CityBlock[][] = [];
  const cityMapString = await convertMultiLineFileToDoubleArray(
    "./testInput.dat",
  );
  let y = 0;
  for (const rawCityRow of cityMapString) {
    const cityRow: CityBlock[] = [];
    let x = 0;
    for (const rawCityBlock of rawCityRow) {
      let distanceFromLavaPool = Infinity;
      if (x === 0 && y === 0) {
        distanceFromLavaPool = 0;
      }
      cityRow.push({
        heatLoss: parseInt(rawCityBlock),
        distanceFromLavaPool,
        coordinates: { x, y },
      });
      x++;
    }
    cityMap.push(cityRow);
    y++;
  }
  return cityMap;
};
