import { solvePart1 } from "./solvePart1.ts";
import { solvePart2 } from "./solvePart2.ts";

const app = (async (
  challengeInputFile?: string,
): Promise<{ solutionPart1: number; solutionPart2: number }> => {
  if (!challengeInputFile) {
    challengeInputFile = "tests/challengeInput.txt";
  }

  const solutionPart1 = await solvePart1(challengeInputFile);
  const solutionPart2 = await solvePart2(challengeInputFile);

  console.log(
    `Part 1: What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans?
    Solution: ${solutionPart1}`,
  );
  console.log(
    `Part 2: Worry levels are no longer divided by three after each item is inspected; what is the level of monkey business after 10000 rounds??
    Solution: ${solutionPart2}`,
  );

  return {
    solutionPart1,
    solutionPart2,
  };
})();

export { app };
