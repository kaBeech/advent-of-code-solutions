import { convertMultiLineFileToArray } from "../../../tools/conversionFunctions/convertFileToArray.ts";
import { ElfMap } from "./types.ts";

export default async (): Promise<ElfMap> => {
  const elfMap: ElfMap = [];
  const playerMapString: string[] = await convertMultiLineFileToArray(
    "./challenge_input.dat",
  );
  let i = -1;
  playerMapString.forEach((line, yIndex) => {
    line.split('').forEach((_rawPlayer, xIndex) => {
      elfMap.push({
        id: i++,
        coordinates: { x: xIndex, y: yIndex },
      });
    });
  });
  return elfMap;
};
