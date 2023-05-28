// import { boilerplateFunction } from "./boilerplateModule.ts";
import { countVisitedPositions } from "./countVisitedPositions.ts";

const app = (async (
  ropeMovementInstructionsFile?: string,
): Promise<{ solutionPart1: number; solutionPart2: number }> => {
  if (!ropeMovementInstructionsFile) {
    ropeMovementInstructionsFile = "tests/ropeMovementInstructions.txt";
  }

  const solutionPart1 = await countVisitedPositions(
    1,
    ropeMovementInstructionsFile,
  );
  const solutionPart2 = await countVisitedPositions(
    9,
    ropeMovementInstructionsFile,
  );

  console.log(
    `Part 1: How many positions does the tail of the rope visit at least once?
    Solution: ${solutionPart1}`,
  );
  console.log(
    `Part 2: How many positions does the tail of the rope visit at least once?
      Solution: ${solutionPart2}`,
  );

  return {
    solutionPart1,
    solutionPart2,
  };
})();

export { app };
