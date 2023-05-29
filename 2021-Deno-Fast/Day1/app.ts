import { convertMultiLineStringToArray } from "../../tools/conversionFunctions/convertStringToArray.ts";

const app = (async (
  challengeInputFile?: string,
): Promise<{ solutionPart1: number; solutionPart2: number }> => {
  if (!challengeInputFile) {
    challengeInputFile = "challengeInput.txt";
  }

  const challengeInput = await Deno.readTextFile(challengeInputFile);
  const challengeInputFormatted = convertMultiLineStringToArray(challengeInput);

  let prevSum: number;
  let currentSum: number;

  let prevDepth2: number;
  let prevDepth: number;
  let currentDepth: number;
  let depthIncreases = 0;
  let depthSumIncreases = 0;

  challengeInputFormatted.forEach((depth) => {
    currentDepth = Number(depth);
    if (prevDepth === null) {
      prevDepth = currentDepth;
      return;
    }

    if (currentDepth > prevDepth) {
      depthIncreases = depthIncreases + 1;
    }
    if (prevDepth2 === null) {
      prevDepth2 = prevDepth;
      return;
    }

    currentSum = currentDepth + prevDepth + prevDepth2;
    if (prevSum === null) {
      prevSum = currentSum;
      return;
    }

    if (currentSum > prevSum) {
      depthSumIncreases = depthSumIncreases + 1;
    }
    prevDepth2 = prevDepth;
    prevDepth = currentDepth;
    prevSum = currentSum;
  });

  const solutionPart1 = depthIncreases;
  const solutionPart2 = depthSumIncreases;

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
