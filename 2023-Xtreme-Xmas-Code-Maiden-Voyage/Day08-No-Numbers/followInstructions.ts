import followInstruction from "./followInstruction.ts";
import getLastChar from "./getLastChar.ts";
import processDirectionData from "./processDirectionData.ts";
import { Instruction, Maps } from "./types.ts";

export default (
  currentInstruction: Instruction,
  maps: Maps,
) => {
  let newInstruction = currentInstruction;
  let directions = maps.directions.split(``);
  let directionsReservoir: string[] = [];
  let reservoirInUse = false;
  let surveyedEndingNodePathLoop: Instruction | undefined = undefined;

  let nonEndInstructionFound = false;

  const directionData = processDirectionData(
    reservoirInUse,
    directions,
    directionsReservoir,
  );

  reservoirInUse = directionData.reservoirInUse;
  directions = directionData.processedDirections;
  directionsReservoir = directionData.processedDirectionsReservoir;
  const currentDirection = directionData.currentDirection;

  while (!surveyedEndingNodePathLoop) {
    const lastEndingNode = newInstruction.lastEndingNode;
    // deno-lint-ignore prefer-const
    let distanceFromLastEndingNode = newInstruction.distanceFromLastEndingNode;
    const nextEndingNode = newInstruction.nextEndingNode;
    // deno-lint-ignore prefer-const
    let distanceFromNextEndingNode = newInstruction.distanceFromNextEndingNode;
    newInstruction = followInstruction(
      maps.instructions,
      newInstruction,
      currentDirection,
    )!;
    if (getLastChar(newInstruction.id) !== `Z`) {
      if (!nonEndInstructionFound) {
        nonEndInstructionFound = true;
      }
      if (lastEndingNode) {
        distanceFromLastEndingNode!++;
        if (!newInstruction.lastEndingNode) {
          newInstruction.lastEndingNode = lastEndingNode,
            newInstruction.distanceFromLastEndingNode =
              distanceFromLastEndingNode;
        }
      }
      if (nextEndingNode) {
        distanceFromNextEndingNode!--;
        if (!newInstruction.nextEndingNode) {
          newInstruction.nextEndingNode = nextEndingNode,
            newInstruction.distanceFromNextEndingNode =
              distanceFromNextEndingNode;
        }
      }
    } else {
      if (
        newInstruction.lastEndingNode &&
        !newInstruction.lastEndingNode.nextEndingNode
      ) {
        distanceFromLastEndingNode!++;
        newInstruction.lastEndingNode.nextEndingNode = newInstruction;
        newInstruction.lastEndingNode.distanceFromNextEndingNode =
          distanceFromLastEndingNode;
      } else if (
        newInstruction.lastEndingNode &&
        newInstruction.lastEndingNode.nextEndingNode
      ) {
        surveyedEndingNodePathLoop = newInstruction.lastEndingNode;
      }
      newInstruction.lastEndingNode = newInstruction;
      newInstruction.distanceFromLastEndingNode = 0;
    }
  }
  return {
    newInstruction,
    surveyedEndingNodePathLoop,
  };
};
