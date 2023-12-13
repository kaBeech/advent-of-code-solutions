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
  let stepsTaken = ``;

  while (!periodicNode) {
    stepsTaken += `N`;

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
      periodicNode = {
        endingNodeId: newInstruction.id,
        period: stepsTaken,
      };
    }
  }

  return periodicNode;
};
