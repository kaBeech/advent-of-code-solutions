import followInstructions from "./followInstructions.ts";
import { Instruction, Maps, PeriodicNode } from "./types.ts";

export default (
  startingInstructions: Instruction[],
  maps: Maps,
) => {
  const currentInstructions = startingInstructions.slice();
  const currentlyCompletelySurveyedEndingNodePathLoops: PeriodicNode[] = [];

  for (const currentlySelectedInstruction of currentInstructions) {
    currentlyCompletelySurveyedEndingNodePathLoops.push(followInstructions(
      currentlySelectedInstruction,
      maps,
    ));
  }

  return currentlyCompletelySurveyedEndingNodePathLoops;
};
