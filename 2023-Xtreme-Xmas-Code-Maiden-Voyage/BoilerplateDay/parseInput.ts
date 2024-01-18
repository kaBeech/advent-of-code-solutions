import { convertMultiLineFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { ElfMap } from "./types.ts";

export const parseInput = async (): Promise<ElfMap> => {
  const elfMap: ElfMap = [];
  const playerMapString: string[] = await convertMultiLineFileToArray(
    "./challengeInput.dat",
  );
  playerMapString.forEach((rawPlayer, index) => {
    elfMap.push({
      id: index,
      coordinates: { x: parseInt(rawPlayer), y: index },
    });
  });
  return elfMap;
};
