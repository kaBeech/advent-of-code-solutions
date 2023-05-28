import { convertMultiLineFileToArray } from "../tools/conversionFunctions/convertFileToArray.ts";
import { Rope } from "./Rope.ts";

const countVisitedPositions = async (
  ropeMovementInstructionsFile: string,
): Promise<number> => {
  const inputFile = await Deno.readTextFile(ropeMovementInstructionsFile);
  const ropeMovementInstructionsArray = await convertMultiLineFileToArray(
    inputFile,
  ) as string[];
  const rope = Rope();
  for (const movementInstruction of ropeMovementInstructionsArray) {
    rope.handleMovementInstruction(movementInstruction);
  }
  return rope.getVisitedTailLocations().length;
};

export { countVisitedPositions };
