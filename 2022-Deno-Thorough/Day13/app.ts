import { solvePart1 } from "./solvePart1.ts";
import { solvePart2 } from "./solvePart2.ts";

const app = (async (
  challengeInputFilePath?: string,
  testInputFilePath?: string,
): Promise<{ solutionPart1: number; solutionPart2: number }> => {
  if (!challengeInputFilePath) {
    challengeInputFilePath = "tests/challengeInput.txt";
  }
  if (!testInputFilePath) {
    testInputFilePath = "tests/testInput.txt";
  }

  const testSolutionPart1 = await solvePart1(testInputFilePath);
  const testSolutionPart2 = await solvePart2(testInputFilePath);

  const solutionPart1 = await solvePart1(challengeInputFilePath);
  const solutionPart2 = await solvePart2(challengeInputFilePath);

  console.log(
    `Part 1: Determine which pairs of packets are already in the right order. What is the sum of the indices of those pairs?
    Test Solution: ${testSolutionPart1}
    Solution: ${solutionPart1}`,
  );
  console.log(
    `Part 2: Organize all of the packets into the correct order. What is the decoder key for the distress signal??
  Test Solution: ${testSolutionPart2}
  Solution: ${solutionPart2}`,
  );

  return {
    solutionPart1,
    solutionPart2,
  };
})();

export { app };
