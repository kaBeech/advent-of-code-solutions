import { convertMultiParagraphFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { comparePacketsPart2 } from "./comparePacketsPart2.ts";

const solvePart2 = async (challengeInput: string): Promise<number> => {
  const packetPairArray = await convertMultiParagraphFileToArray(
    challengeInput,
  ) as string[][];
  const packetArray = packetPairArray.flat();
  packetArray.push("[[2]]");
  packetArray.push("[[6]]");
  packetArray.sort(comparePacketsPart2);

  const indexA = packetArray.findIndex((packet) => packet === "[[2]]");
  const indexB = packetArray.findIndex((packet) => packet === "[[6]]");
  const indexProduct = (indexA + 1) * (indexB + 1);

  return indexProduct;
};

export { solvePart2 };
