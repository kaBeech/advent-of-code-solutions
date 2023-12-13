import followInstruction from "./followInstruction.ts";
import getLastChar from "./getLastChar.ts";
import processDirectionData from "./processDirectionData.ts";
import { TypeInstruction, TypeMaps, TypePeriodicNode } from "./types.ts";

export default (
  currentInstruction: TypeInstruction,
  maps: TypeMaps,
) => {
  let currentlySelectedInstructionNew = currentInstruction;
  let directions = maps.directions.split(``);
  let directionsReservoir: string[] = [];
  let directionsReservoirInUse = false;
  let divinedPeriodicNode: TypePeriodicNode | undefined = undefined;
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
