import { solvePart1 } from "./solvePart1.ts";
import { solvePart2 } from "./solvePart2.ts";

const app = (async (
  challengeInputFile?: string,
): Promise<{ solutionPart1: string; solutionPart2: string }> => {
  if (!challengeInputFile) {
    challengeInputFile = "tests/boilerplateChallengeInput.txt";
  }

  const solutionPart1 = await solvePart1(challengeInputFile);
  const solutionPart2 = await solvePart2(challengeInputFile);

  console.log(`Part 1: What is the answer to Part 1?
    Solution: ${solutionPart1}`);
  console.log(`Part 2: What is the answer to Part 2?
    Solution: ${solutionPart2}`);

  return {
    solutionPart1,
    solutionPart2,
  };
})();

export { app };
