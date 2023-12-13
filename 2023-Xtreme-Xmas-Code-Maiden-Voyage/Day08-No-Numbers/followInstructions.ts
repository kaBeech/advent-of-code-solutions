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

  while (!periodicNode) {
    stepsTaken++;

    const directionData = processDirectionData(
      reservoirInUse,
      directions,
      directionsReservoir,
    );

    reservoirInUse = directionData.reservoirInUse;
    directions = directionData.processedDirections;
    directionsReservoir = directionData.processedDirectionsReservoir;
    const currentDirection = directionData.currentDirection;

    newInstruction = followInstruction(
      maps.instructions,
      newInstruction,
      currentDirection,
    )!;
    if (getLastChar(newInstruction.id) === `Z`) {
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
