import { convertMultiLineFileToArray } from "../tools/conversionFunctions/convertFileToArray.ts";
import { getDifference } from "../tools/mathFunctions/getDifference.ts";

const app = (async (
  crtProgramFile?: string,
): Promise<{ solutionPart1: number; solutionPart2: string }> => {
  if (!crtProgramFile) {
    crtProgramFile = "tests/crtProgram.txt";
  }

  const inputArray = await convertMultiLineFileToArray(crtProgramFile);
  let cycleNumber = 1;
  let registerX = 1;
  const unfinishedAddXProcesses: {
    effectiveCycle: number;
    valueToAdd: number;
  }[] = [];
  let collectedSignalStrengthsSum = 0;
  const screenPixels: string[] = [];
  inputArray.forEach((input) => {
    if (
      unfinishedAddXProcesses.length > 0 &&
      (unfinishedAddXProcesses[0].effectiveCycle === cycleNumber)
    ) {
      registerX += unfinishedAddXProcesses[0].valueToAdd;
      unfinishedAddXProcesses.shift();
    }

    // Additional Cycles (Sub Cycles)
    if (input[0] === "a") {
      const inputValue = input.split(" ")[1];
      unfinishedAddXProcesses.push({
        effectiveCycle: cycleNumber + 2,
        valueToAdd: +inputValue,
      });

      if (Number.isInteger((cycleNumber + 20) / 40)) {
        collectedSignalStrengthsSum += cycleNumber * registerX;
        console.log(
          "Cy#" + cycleNumber + " * regX" + registerX + " = " +
            cycleNumber * registerX,
        );
        console.log("Sum total = " + collectedSignalStrengthsSum);
      }
      if (getDifference((cycleNumber % 40) - 1, registerX) <= 1) {
        screenPixels.push("#");
      } else {
        screenPixels.push(".");
      }
      // End of Cycle
      cycleNumber++;
      if (
        unfinishedAddXProcesses.length > 0 &&
        (unfinishedAddXProcesses[0].effectiveCycle === cycleNumber)
      ) {
        registerX += unfinishedAddXProcesses[0].valueToAdd;
        unfinishedAddXProcesses.shift();
      }
    }

    if (Number.isInteger((cycleNumber + 20) / 40)) {
      collectedSignalStrengthsSum += cycleNumber * registerX;
      console.log(
        "Cy#" + cycleNumber + " * regX" + registerX + " = " +
          cycleNumber * registerX,
      );
      console.log("Sum total = " + collectedSignalStrengthsSum);
    }
    if (getDifference((cycleNumber % 40) - 1, registerX) <= 1) {
      screenPixels.push("#");
    } else {
      screenPixels.push(".");
    }
    // End of Cycle
    console.log("Cy#" + cycleNumber++ + " " + input);
  });

  const screen = [
    String(screenPixels.slice(0, 40)),
    String(screenPixels.slice(40, 80)),
    String(screenPixels.slice(80, 120)),
    String(screenPixels.slice(120, 160)),
    String(screenPixels.slice(160, 200)),
    String(screenPixels.slice(200, 240)),
  ];

  screen.forEach((screenLine) => {
    console.log(screenLine);
  });

  const solutionPart1 = collectedSignalStrengthsSum;
  const solutionPart2 = "See console logs";

  console.log(
    `Part 1: What is the sum of these six signal strengths?
    Solution: ${solutionPart1}`,
  );
  console.log(
    `Part 2: What eight capital letters appear on your CRT?
        Solution: ${solutionPart2}`,
  );

  return {
    solutionPart1,
    solutionPart2,
  };
})();
export { app };
