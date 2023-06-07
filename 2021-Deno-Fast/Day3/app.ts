import { convertMultiLineStringToArray } from "../../tools/conversionFunctions/convertStringToArray.ts";

const app = (async (
  challengeInputFile?: string,
): Promise<
  {
    // deno-lint-ignore no-explicit-any
    testSolution: { solutionPart1: any; solutionPart2: any };
    // deno-lint-ignore no-explicit-any
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

  const getSolution = (input: string[], test: boolean) => {
    let solutionAlert = "Challenge ";
    test && (solutionAlert = "Test ");

    let gammaRate = "";
    let epsilonRate = "";
    let oxygenGeneratorRatings = input;
    let cO2ScrubberRatings = input;

    for (let i = 0; input[0].length > i; i++) {
      const zeroesRegister: string[] = [];
      const onesRegister: string[] = [];
      input.forEach((input) => {
        const inputBitsArray = input.split("");
        if (inputBitsArray[i] === "0") {
          zeroesRegister.push(inputBitsArray[i]);
        } else onesRegister.push(inputBitsArray[i]);
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

    for (let i = 0; input[0].length > i; i++) {
      const zeroesRegister: string[] = [];
      const onesRegister: string[] = [];
      console.log(i + "o" + oxygenGeneratorRatings.length);

      oxygenGeneratorRatings.forEach((oxygenGeneratorRating) => {
        const inputBitsArray = oxygenGeneratorRating.split("");
        if (inputBitsArray[i] === "0") {
          zeroesRegister.push(inputBitsArray[i]);
        } else onesRegister.push(inputBitsArray[i]);
      });
      i === 1 &&
        console.log(zeroesRegister.length + "zo" + onesRegister.length);

      if (
        oxygenGeneratorRatings.length > 1 &&
        (zeroesRegister.length <= onesRegister.length)
      ) {
        oxygenGeneratorRatings = oxygenGeneratorRatings.filter((binaryNumber) =>
          binaryNumber[i] === "1"
        );
      }
      if (
        oxygenGeneratorRatings.length > 1 &&
        (zeroesRegister.length > onesRegister.length)
      ) {
        oxygenGeneratorRatings = oxygenGeneratorRatings.filter((binaryNumber) =>
          binaryNumber[i] === "0"
        );
      }
    }

    for (let i = 0; input[0].length > i; i++) {
      console.log(i + "c" + cO2ScrubberRatings.length);

      const zeroesRegister: string[] = [];
      const onesRegister: string[] = [];

      cO2ScrubberRatings.forEach((cO2ScrubberRating) => {
        const inputBitsArray = cO2ScrubberRating.split("");

        if (inputBitsArray[i] === "0") {
          zeroesRegister.push(inputBitsArray[i]);
        } else onesRegister.push(inputBitsArray[i]);
      });

      i === 1 &&
        console.log(zeroesRegister.length + "zo" + onesRegister.length);

      if (
        cO2ScrubberRatings.length > 1 &&
        (zeroesRegister.length <= onesRegister.length)
      ) {
        cO2ScrubberRatings = cO2ScrubberRatings.filter((binaryNumber) =>
          binaryNumber[i] === "0"
        );
      }
      if (
        cO2ScrubberRatings.length > 1 &&
        (zeroesRegister.length > onesRegister.length)
      ) {
        cO2ScrubberRatings = cO2ScrubberRatings.filter((binaryNumber) =>
          binaryNumber[i] === "1"
        );
      }
    }

    // console.log(cO2ScrubberRating);
    // console.log(oxygenGeneratorRating);
    const solutionPart1 = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
    const solutionPart2 = parseInt(cO2ScrubberRatings[0], 2) *
      parseInt(oxygenGeneratorRatings[0], 2);

    //
    // ONLY QUESTION PHRASING EDITS BELOW THIS LINE
    //

    console.log(`Part 1: What is the power consumption of the submarine?
    ${solutionAlert} Solution: ${solutionPart1}`);
    console.log(`Part 2: What is the life support rating of the submarine?
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
