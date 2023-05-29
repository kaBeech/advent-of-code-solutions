import { convertMultiLineStringToArray } from "../../tools/conversionFunctions/convertStringToArray.ts";

const app = (async (
  challengeInputFile?: string,
): Promise<{ solutionPart1: any; solutionPart2: any }> => {
  if (!challengeInputFile) {
    challengeInputFile = "challengeInput.txt";
  }

  const challengeInput = await Deno.readTextFile(challengeInputFile);
  const challengeInputFormatted = convertMultiLineStringToArray(challengeInput);

  let horizPos = 0;
  let depth = 0;

  challengeInputFormatted.forEach((movementInstruction) => {
    const movementInstructionFormatted = movementInstruction.split(" ");
    switch (movementInstructionFormatted[0][0]) {
      case "f":
        horizPos += +movementInstructionFormatted[1];
        break;
      case "d":
        depth += +movementInstructionFormatted[1];
        break;
      case "u":
        depth -= +movementInstructionFormatted[1];
        break;
      default:
        console.log(`Error!!!!!!`);
    }
  });

  const solutionPart1 = depth * horizPos;
  const solutionPart2 = +challengeInputFormatted[0];

  console.log(
    `What do you get if you multiply your final horizontal position by your final depth?
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
