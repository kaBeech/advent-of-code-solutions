import { convertMultiLineStringToArray } from "../../tools/conversionFunctions/convertStringToArray.ts";

const app = (async (
  challengeInputFile?: string,
): Promise<
  {
    testSolution: { solutionPart1: any; solutionPart2: any };
    challengeSolution: { solutionPart1: any; solutionPart2: any };
  }
> => {
  if (!challengeInputFile) {
    challengeInputFile = "challengeInput.txt";
  }

  //
  // NO EDITS ABOVE THIS LINE
  //

  const testInput = await Deno.readTextFile("testInput.txt");
  const testInputFormatted = convertMultiLineStringToArray(testInput);
  const challengeInput = await Deno.readTextFile(challengeInputFile);
  const challengeInputFormatted = convertMultiLineStringToArray(challengeInput);

  //
  // ONLY INPUT FORMATTING ABOVE THIS LINE
  //

  const getSolution = (input: any[], test: boolean) => {
    let solutionAlert = "Challenge ";
    test && (solutionAlert = "Test ");

    // Set up variables
    //

    input.forEach((input) => {
      // Format input
      //

      // Compute
      //
    });

    // Update solution calculation
    //
    const solutionPart1 = +challengeInputFormatted[0];
    const solutionPart2 = +challengeInputFormatted[0];

    //
    // NO EDITS BELOW THIS LINE
    //

    console.log(`Part 1: What is the answer to Part 1?
    ${solutionAlert} Solution: ${solutionPart1}`);
    console.log(`Part 2: What is the answer to Part 2?
    ${solutionAlert} Solution: ${solutionPart2}`);
    console.log("Done!");

    return {
      solutionPart1,
      solutionPart2,
    };
  };

  const testSolution = getSolution(testInputFormatted, true);
  const challengeSolution = getSolution(challengeInputFormatted, false);

  return {
    testSolution,
    challengeSolution,
  };
})();

export { app };
