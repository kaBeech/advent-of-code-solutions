import { convertMultiLineFileToArray } from "../tools/conversionFunctions/convertFileToArray.ts";

const app = (async (
  crtProgramFile?: string,
): Promise<{ solutionPart1: number; solutionPart2: number }> => {
  if (!crtProgramFile) {
    crtProgramFile = "tests/ropeMovementInstructions.txt";
  }

  const inputArray = await convertMultiLineFileToArray("tests/crtProgram.txt");
  let cycleNumber = 1;
  let registerX = 1;
  const unfinishedAddXProcesses: {
    effectiveCycle: number;
    valueToAdd: number;
  }[] = [];
  let collectedSignalStrengthsSum = 0;
  inputArray.forEach((input) => {
    if (
      unfinishedAddXProcesses.length > 0 &&
      (unfinishedAddXProcesses[0].effectiveCycle === cycleNumber)
    ) {
      registerX += unfinishedAddXProcesses[0].valueToAdd;
      unfinishedAddXProcesses.shift();
    }

    if (input[0] === "a") {
      const inputValue = input.split(" ")[1];
      unfinishedAddXProcesses.push({
        effectiveCycle: cycleNumber + 3,
        valueToAdd: +inputValue,
      });
    }

    if (Number.isInteger((cycleNumber + 20) / 40)) {
      collectedSignalStrengthsSum += cycleNumber * registerX;
    }
    console.log(cycleNumber++);
  });

  const solutionPart1 = collectedSignalStrengthsSum;
  const solutionPart2 = 1;

  console.log(
    `Part 1: What is the sum of these six signal strengths?
    Solution: ${solutionPart1}`,
  );
  //   console.log(
  //     `Part 2: How many positions does the tail of the rope visit at least once?
  //       Solution: ${solutionPart2}`,
  //   );

  return {
    solutionPart1,
    solutionPart2,
  };
})();
export { app };
