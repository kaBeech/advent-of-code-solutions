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
    let gammaRate = "";
    let epsilonRate = "";
    let oxygenGeneratorRating = "";
    let cO2ScrubberRating = "";

    for (let i = 0; input[0].length > i; i++) {
      const zeroesRegister: any[] = [];
      const onesRegister: any[] = [];
      input.forEach((input) => {
        const inputBitsArray = input.split("");
        if (inputBitsArray[i] === "0") {
          zeroesRegister.push(inputBitsArray[i]);
        } else onesRegister.push(inputBitsArray[i]);

        // Compute
        //
      });
      // console.log(zeroesRegister.length);
      // console.log(onesRegister.length);
      if (zeroesRegister.length > onesRegister.length) {
        gammaRate = gammaRate + "0";
        epsilonRate = epsilonRate + "1";
      } else {
        gammaRate = gammaRate + "1";
        epsilonRate = epsilonRate + "0";
      }
    }

    // Update solution calculation
    //
    // console.log(gammaRate);
    // console.log(epsilonRate);
    const solutionPart1 = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
    const solutionPart2 = challengeInputFormatted[0];

    //
    // ONLY QUESTION PHRASING EDITS BELOW THIS LINE
    //

    console.log(`Part 1: What is the power consumption of the submarine?
    ${solutionAlert} Solution: ${solutionPart1}`);
    console.log(`Part 2: What is the answer to Part 2?
    ${solutionAlert} Solution: ${solutionPart2}`);
    console.log("Done!");

    //
    // NO EDITS BELOW THIS LINE
    //

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
