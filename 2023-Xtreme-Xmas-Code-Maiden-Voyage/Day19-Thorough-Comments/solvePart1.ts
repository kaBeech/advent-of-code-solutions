import evalRule from "./evalRule.ts";
import parseInput from "./parseInput.ts";

export default (async function (): Promise<number> {
  const { workflows, parts } = await parseInput();

  for (const part of parts) {
    const workflow = workflows.find((workflow) => workflow.name === `in`)!;
    for (const rule of workflow.rules) {
      switch (rule.category) {
        case `x`:
          evalRule(part.x, rule);
          break;
        case `m`:
          evalRule(part.m, rule);
          break;
        case `a`:
          evalRule(part.a, rule);
          break;
        case `s`:
          evalRule(part.s, rule);
          break;
        default:
          throw new Error(`Unknown category ${rule.category}`);
      }
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
