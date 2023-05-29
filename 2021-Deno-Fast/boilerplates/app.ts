import { convertMultiLineStringToArray } from "../../tools/conversionFunctions/convertStringToArray.ts";

const app = (async (
  challengeInputFile?: string,
): Promise<{ solutionPart1: any; solutionPart2: any }> => {
  if (!challengeInputFile) {
    challengeInputFile = "testInput.txt";
  }

  const challengeInput = await Deno.readTextFile(challengeInputFile);
  const challengeInputFormatted = convertMultiLineStringToArray(challengeInput);

  // Code goes here!!!
  //

  // Format input
  //

  // Set up variables
  //

  // Compute
  //

  const solutionPart1 = +challengeInputFormatted[0];
  const solutionPart2 = +challengeInputFormatted[0];

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
