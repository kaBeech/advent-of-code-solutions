
import { convertMultiLineFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";

const solvePart1 = async (challengeInput: string): Promise<number> => {
    let indexSum = 0;
    const packetPairArray = await convertMultiLineFileToArray(
        challengeInput,
    ) as string[];

    return indexSum + packetPairArray.length;
};

export { solvePart1 };
