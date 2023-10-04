import { convertMultiParagraphFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { comparePackets } from "./comparePackets.ts";

const solvePart2 = async (challengeInput: string): Promise<number> => {
  let indexSum = 0;
  const packetPairArray = await convertMultiParagraphFileToArray(
    challengeInput,
  ) as string[][];
  const packetArray = packetPairArray.flat();
  packetArray.push("[[2]]");
  packetArray.push("[[6]]");
  packetArray.sort(comparePacketsPart2);

  packetPairArray.forEach((packetPair, index) => {
    const leftPacket = JSON.parse(packetPair[0]);
    const rightPacket = JSON.parse(packetPair[1]);
    if (comparePackets(leftPacket, rightPacket) === "right order") {
      indexSum += index + 1;
    }
  });

  return indexSum;
};

export { solvePart2 };
