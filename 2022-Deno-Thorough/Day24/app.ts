
import { solvePart1 } from "./solvePart1.ts";
// import { solvePart2 } from "./solvePart2.ts";

const app = (async (
    challengeInputFilePath?: string,
    testInputFilePath?: string,
): Promise<{ solutionPart1: number; solutionPart2: number }> => {
    if (!challengeInputFilePath) {
        challengeInputFilePath = "tests/challenge_input.dat";
    }
    if (!testInputFilePath) {
        testInputFilePath = "tests/test_input.dat";
    }

    const testSolutionPart1 = await solvePart1(testInputFilePath);
    // const testSolutionPart2 = await solvePart2(testInputFilePath);

    const solutionPart1 = await solvePart1(challengeInputFilePath);
    // const solutionPart2 = await solvePart2(challengeInputFilePath);

    console.log(
        `Part 1: What SNAFU number do you supply to Bob's console?
    Test Solution: ${testSolutionPart1}
    Solution: ${solutionPart1}`,
    );
    console.log(
        `Part 2:
    Test Solution: ${24}
    Solution: ${24}`,
    );

    return {
        solutionPart1,
        solutionPart2: 24,
    };
})();

export { app };
