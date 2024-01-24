import parseInput from "./parseInput.ts";

export default (async function (): Promise<number> {
  const { workflows, parts } = await parseInput();

  const sumTotal = 0;

  console.log(
    `Part 1: The sum of all rating numbers for all parts is ${sumTotal}`,
  );

  return sumTotal;
})();
