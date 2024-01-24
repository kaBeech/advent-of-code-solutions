import evalWorkflow from "./evalWorkflow.ts";
import parseInput from "./parseInput.ts";
import { Part } from "./types.ts";

export default (async function (): Promise<number> {
  const { workflows, parts } = await parseInput();
  const acceptedParts: Part[] = [];

  for (const part of parts) {
    if (
      evalWorkflow(
        part,
        workflows.find((workflow) => workflow.name === `in`)!,
        workflows,
      )
    ) {
      acceptedParts.push(part);
    }
  }

  const sumTotal = 0;

  console.log(
    `Part 1: The sum of all rating numbers for all parts is ${sumTotal}`,
  );

  return sumTotal;
})();
