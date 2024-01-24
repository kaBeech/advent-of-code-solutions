import evalPart from "./evalPart.ts";
import parseInput from "./parseInput.ts";

export default (async function (): Promise<number> {
  const { workflows, parts } = await parseInput();

  for (const part of parts) {
    if (
      evalPart(
        part,
        workflows.find((workflow) => workflow.name === `in`)!,
        workflows,
      )
    ) {
      acceptedParts.push(part);
    }

    console.log(
      `Part ${JSON.stringify(part)} has workflow ${JSON.stringify(workflow)}`,
    );
  }

  const sumTotal = 0;

  console.log(
    `Part 1: The sum of all rating numbers for all parts is ${sumTotal}`,
  );

  return sumTotal;
})();
