import { solvePart1 } from "./solvePart1.ts";
import { solvePart2 } from "./solvePart2.ts";

const app = (async (
  challengeInputFilePath?: string,
  testInputFilePath?: string,
): Promise<{ solutionPart1: string; solutionPart2: string }> => {
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

  console.log(`Part 1: What is the answer to Part 1?
    TestSolution: ${testSolutionPart1}
    Solution: ${solutionPart1}`);
  console.log(`Part 2: What is the answer to Part 2?
    TestSolution: ${testSolutionPart2}
    Solution: ${solutionPart2}`);

  return {
    solutionPart1,
    solutionPart2,
  };
})();

export { app };
