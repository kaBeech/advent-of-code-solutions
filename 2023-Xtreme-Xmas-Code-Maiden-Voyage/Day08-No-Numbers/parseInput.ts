import { convertMultiParagraphFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { Maps } from "./types.ts";

export const parseInput = async (): Promise<Maps> => {
  const mapsRaw: string[][] = await convertMultiParagraphFileToArray(
    "./challengeInput.dat",
  );
  const maps: Maps = {
    directions: mapsRaw.shift()!.shift()!,
    instructions: [],
  };
  for (const instruction of mapsRaw.shift()!) {
    console.log(instruction);
    const rawIdAndDirections = instruction.split(`=`);
    const id = rawIdAndDirections.shift()!.trim();
    const rawDirections = rawIdAndDirections.shift()!.trim().split(`,`);
    const l = rawDirections.shift()!.trim().split(``);
    l.shift();
    const r: string[] = rawDirections.shift()!.trim().split(``);
    r.pop();
    maps.instructions.push({
      id,
      l: l.join(``),
      r: r.join(``),
    });
  }
  return maps;
};
