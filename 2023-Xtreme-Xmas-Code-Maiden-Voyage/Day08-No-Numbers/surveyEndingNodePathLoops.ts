import followInstructions from "./followInstructions.ts";
import { TypeInstruction, TypeMaps, TypePeriodicNode } from "./types.ts";

export default (
  startingInstructions: TypeInstruction[],
  maps: TypeMaps,
) => {
  const currentInstructions = startingInstructions.slice();
  const currentlyCompletelySurveyedEndingNodePathLoops: TypePeriodicNode[] = [];

  for (const currentlySelectedInstruction of currentInstructions) {
    currentlyCompletelySurveyedEndingNodePathLoops.push(followInstructions(
      currentlySelectedInstruction,
      maps,
    ));
  }

  return currentlyCompletelySurveyedEndingNodePathLoops;
};
