import { convertMultiParagraphFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { TypeMaps } from "./types.ts";

export default async (): Promise<TypeMaps> => {
  const aTinyArrayOfMaps: string[][] = await convertMultiParagraphFileToArray(
    "./challengeInput.dat",
  );
  const aTinyArrayOfMapsProcessed: TypeMaps = {
    directions: aTinyArrayOfMaps.shift()!.shift()!,
    instructions: [],
  };
  for (const aTinyInstruction of aTinyArrayOfMaps.shift()!) {
    const aTinyInstructionDirectionsAndIdRaw = aTinyInstruction.split(`=`);
    const aTinyInstructionDirectionsId = aTinyInstructionDirectionsAndIdRaw
      .shift()!
      .trim();
    const aTinyInstructionDirectionsRaw = aTinyInstructionDirectionsAndIdRaw
      .shift()!.trim().split(`,`);
    const aTinyInstructionDirectionsStringL = aTinyInstructionDirectionsRaw
      .shift()!.trim().split(``);
    aTinyInstructionDirectionsStringL.shift();
    const aTinyInstructionDirectionsStringR: string[] =
      aTinyInstructionDirectionsRaw.shift()!.trim().split(``);
    aTinyInstructionDirectionsStringR.pop();

    aTinyArrayOfMapsProcessed.instructions.push({
      id: aTinyInstructionDirectionsId,
      l: aTinyInstructionDirectionsStringL.join(``),
      r: aTinyInstructionDirectionsStringR.join(``),
    });
  }
  return aTinyArrayOfMapsProcessed;
};
