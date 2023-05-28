import { convertMultiLineStringToArray } from "../../tools/conversionFunctions/convertStringToArray.ts";

const app = (async (
  challengeInputFile?: string,
): Promise<{ solutionPart1: number; solutionPart2: number }> => {
  if (!challengeInputFile) {
    challengeInputFile = "tests/challengeInput.txt";
  }

  const challengeInput = await Deno.readTextFile(challengeInputFile);
  const challengeInputFormatted = convertMultiLineStringToArray(challengeInput);

  const solutionPart1 = +challengeInput;
  const solutionPart2 = 0;

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
