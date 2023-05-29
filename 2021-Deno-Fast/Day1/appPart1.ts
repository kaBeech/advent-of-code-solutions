import { convertMultiLineStringToArray } from "../../tools/conversionFunctions/convertStringToArray.ts";

const app = (async (
  challengeInputFile?: string,
): Promise<{ solutionPart1: number; solutionPart2: number }> => {
  if (!challengeInputFile) {
    challengeInputFile = "challengeInput.txt";
  }

  const challengeInput = await Deno.readTextFile(challengeInputFile);
  const challengeInputFormatted = convertMultiLineStringToArray(challengeInput);

  let prevDepth: number;
  let depthIncreases = 0;

  challengeInputFormatted.forEach((depth) => {
    // if (challengeInputFormatted.indexOf(depth) === 0) {
    if (prevDepth === null) {
      return;
    }
    if (+depth > prevDepth) {
      depthIncreases++;
    }
    prevDepth = +depth;
  });

  const solutionPart1 = depthIncreases;
  const solutionPart2 = +challengeInputFormatted[0];

  console.log(
    `Part 1: How many measurements are larger than the previous measurement?
    Solution: ${solutionPart1}`,
  );
  console.log(`Part 2: What is the answer to Part 2?
    Solution: ${solutionPart2}`);

  return {
    solutionPart1,
    solutionPart2,
  };
})();

export { app };
