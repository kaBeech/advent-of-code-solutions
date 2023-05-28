// import { boilerplateFunction } from "./boilerplateModule.ts";
import { countVisitedPositions } from "./countVisitedPositions.ts";

const app = (async (
  ropeMovementInstructionsFile?: string,
): Promise<{ solutionPart1: number; solutionPart2: number }> => {
  if (!ropeMovementInstructionsFile) {
    ropeMovementInstructionsFile = "tests/ropeMovementInstructions.txt";
  }

  const solutionPart1 = await countVisitedPositions(
    ropeMovementInstructionsFile,
  );
  //   const solutionPart2 = await boilerplateFunction(ropeMovementInstructionsFile);

  console.log(
    `Part 1: How many positions does the tail of the rope visit at least once?
    Solution: ${solutionPart1}`,
  );
  //   console.log(`Part 2: What is the answer to Part 2?
  //     Solution: ${solutionPart2}`);
  const solutionPart2 = 0;

  return {
    solutionPart1,
    solutionPart2,
  };
})();

export { app };
