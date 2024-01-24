import evalWorkflowPart1 from "./evalWorkflowPart1.ts";
import getPartRating from "./getPartRating.ts";
import parseInput from "./parseInput.ts";
import { Part } from "./types.ts";

export default (async function (): Promise<number> {
  // Parse the input into workflows and parts.
  const { workflows, parts } = await parseInput();

  // Evaluate each part and make a list of the accepted parts.
  const acceptedParts: Part[] = [];
  for (const part of parts) {
    // If a part is accepted, add it to the acceptedParts array.
    if (
      evalWorkflowPart1(
        part,
        workflows.find((workflow) => workflow.name === `in`)!,
        workflows,
      )
    ) {
      acceptedParts.push(part);
    }
  }

  // Get the sum of all parts' rating numbers added together.
  let sumTotal = 0;
  for (const acceptedPart of acceptedParts) {
    sumTotal += getPartRating(acceptedPart);
  }

  console.log(
    `Part 1: The sum of all rating numbers for all parts is ${sumTotal}`,
  );

  return sumTotal;
})();
