
import { convertMultiLineFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { snafuToDecimal, decimalToSNAFU } from "./convertSNAFU.ts"

const solvePart1 = async (challengeInput: string): Promise<string> => {
    let sum = 0;
    const fuelReqs = await convertMultiLineFileToArray(
        challengeInput,
    ) as string[];

    fuelReqs.forEach((fuelReqSNAFU) => {
        sum += snafuToDecimal(fuelReqSNAFU);
    });

    return decimalToSNAFU(sum);
};

export { solvePart1 };
