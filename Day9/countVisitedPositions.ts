import { convertMultiLineFileToArray } from "../tools/conversionFunctions/convertFileToArray.ts";
import { Rope } from "./Rope.ts";

const countVisitedPositions = async (
  ropeMovementInstructionsFile: string,
  ropeLength: number,
): Promise<number> => {
  const ropeMovementInstructionsArray = await convertMultiLineFileToArray(
    ropeMovementInstructionsFile,
  ) as string[];
  const rope = Rope(ropeLength);
  for (const movementInstruction of ropeMovementInstructionsArray) {
    rope.handleMovementInstruction(movementInstruction);
  }
  return rope.getVisitedTailLocations().length;
};

export { countVisitedPositions };
