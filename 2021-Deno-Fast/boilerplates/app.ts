import { convertMultiLineStringToArray } from "../../tools/conversionFunctions/convertStringToArray.ts";

const app = (async (
  challengeInputFile?: string,
): Promise<{ solutionPart1: any; solutionPart2: any }> => {
  if (!challengeInputFile) {
    challengeInputFile = "challengeInput.txt";
  }

  const testInput = await Deno.readTextFile("testInput.txt");
  const testInputFormatted = convertMultiLineStringToArray(testInput);
  const challengeInput = await Deno.readTextFile(challengeInputFile);
  const challengeInputFormatted = convertMultiLineStringToArray(challengeInput);
  const formattedInputs = [testInputFormatted, challengeInputFormatted];

  let testSolutionPart1 = +testInputFormatted[0];
  let testSolutionPart2 = +testInputFormatted[0];
  let solutionPart1 = +challengeInputFormatted[0];
  let solutionPart2 = +challengeInputFormatted[0];

  formattedInputs.forEach((input) => {
    // Format input
    //

    // Set up variables
    //

    // Compute
    //
  });

  console.log(`Part 1: What is the answer to Part 1?
    Test Solution: ${testSolutionPart1}
    Solution: ${solutionPart1}`);
  console.log(`Part 2: What is the answer to Part 2?
    Test Solution: ${testSolutionPart2}
    Solution: ${solutionPart2}`);

  return {
    solutionPart1,
    solutionPart2,
  };
})();

export { app };
