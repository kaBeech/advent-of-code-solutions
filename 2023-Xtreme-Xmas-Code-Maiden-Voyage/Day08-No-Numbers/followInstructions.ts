import followInstruction from "./followInstruction.ts";
import getLastChar from "./getLastChar.ts";
import processDirectionData from "./processDirectionData.ts";
import { Instruction, Maps, PeriodicNode } from "./types.ts";

export default (
  currentInstruction: Instruction,
  maps: Maps,
) => {
  let newInstruction = currentInstruction;
  let directions = maps.directions.split(``);
  let directionsReservoir: string[] = [];
  let reservoirInUse = false;
  let periodicNode: PeriodicNode | undefined = undefined;
  let stepsTaken = 0;
  let stepsToReachFirstTime = 0;
  let stepsToReachSecondTime = 0;

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

  while (!periodicNode) {
    stepsTaken++;
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
      if (stepsToReachFirstTime === 0) {
        stepsToReachFirstTime = stepsTaken;
      } else {
        stepsToReachSecondTime = stepsTaken;
        periodicNode = {
          endingNodeId: newInstruction.id,
          period: stepsToReachSecondTime - stepsToReachFirstTime,
          distanceFromNextEndingNode: stepsToReachFirstTime,
        };
      }
    }
  }

  return periodicNode;
};
