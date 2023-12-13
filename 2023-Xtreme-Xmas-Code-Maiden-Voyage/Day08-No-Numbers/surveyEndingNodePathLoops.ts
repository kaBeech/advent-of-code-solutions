import followInstructions from "./followInstructions.ts";
import { Instruction, Maps, PeriodicNode } from "./types.ts";

export default (
  startingInstructions: Instruction[],
  maps: Maps,
) => {
  const currentInstructions = startingInstructions.slice();
  const surveyedEndingNodePathLoops: PeriodicNode[] = [];

  for (const currentInstruction of currentInstructions) {
    surveyedEndingNodePathLoops.push(followInstructions(
      currentInstruction,
      maps,
    ));
  }

  return surveyedEndingNodePathLoops;
};
