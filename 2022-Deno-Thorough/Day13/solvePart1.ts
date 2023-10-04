import { convertMultiLineFileToDoubleArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { comparePackets } from "./comparePackets.ts";

const solvePart1 = async (challengeInput: string): Promise<number> => {
  let indexSum = 0;
  const packetPairArray = await convertMultiLineFileToDoubleArray(
    challengeInput,
  ) as string[][];

  packetPairArray.forEach((packetPair, index) => {
    const leftPacket = JSON.parse(packetPair[0]);
    const rightPacket = JSON.parse(packetPair[1]);
    if (comparePackets(leftPacket, rightPacket) === "right order") {
      indexSum += index;
    }
  });

  return indexSum;
};

export { solvePart1 };
