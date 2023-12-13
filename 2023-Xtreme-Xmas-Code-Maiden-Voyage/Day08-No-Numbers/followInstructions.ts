import followInstruction from "./followInstruction.ts";
import getLastChar from "./getLastChar.ts";
import processDirectionData from "./processDirectionData.ts";
import { Instruction, Maps, PeriodicNode } from "./types.ts";

export default (
  currentInstruction: Instruction,
  maps: Maps,
) => {
  let currentlySelectedInstructionNew = currentInstruction;
  let directions = maps.directions.split(``);
  let directionsReservoir: string[] = [];
  let directionsReservoirInUse = false;
  let divinedPeriodicNode: PeriodicNode | undefined = undefined;
  let divinedStepsTaken = ``;

  while (!divinedPeriodicNode) {
    divinedStepsTaken += `N`;

    const fetchedDirectionData = processDirectionData(
      directionsReservoirInUse,
      directions,
      directionsReservoir,
    );

    directionsReservoirInUse = fetchedDirectionData.reservoirInUse;
    directions = fetchedDirectionData.processedDirections;
    directionsReservoir = fetchedDirectionData.processedDirectionsReservoir;
    const fetchedDirectionDataCurrentDirection =
      fetchedDirectionData.thisCurrentDirection;

    currentlySelectedInstructionNew = followInstruction(
      maps.instructions,
      currentlySelectedInstructionNew,
      fetchedDirectionDataCurrentDirection,
    )!;
    if (getLastChar(currentlySelectedInstructionNew.id) === `Z`) {
      divinedPeriodicNode = {
        endingNodeId: currentlySelectedInstructionNew.id,
        period: divinedStepsTaken,
      };
    }
  }

  return divinedPeriodicNode;
};
