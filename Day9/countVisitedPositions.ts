import { convertMultiLineFileToArray } from "../tools/conversionFunctions/convertFileToArray.ts";
import { Rope } from "./Rope.ts";

const countVisitedPositions = async (
  numberOfTailSegments: number,
  ropeMovementInstructionsFile: string,
): Promise<number> => {
  const ropeMovementInstructionsArray = await convertMultiLineFileToArray(
    ropeMovementInstructionsFile,
  ) as string[];
  const rope = Rope(numberOfTailSegments);
  for (const movementInstruction of ropeMovementInstructionsArray) {
    rope.handleMovementInstruction(movementInstruction);
  }
  return rope.getVisitedTailLocations().length;
};

export { countVisitedPositions };
