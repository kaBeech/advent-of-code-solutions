import { convertMultiParagraphFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { ParsedInput } from "./types.ts";

export default async (): Promise<ParsedInput> => {
  const input = await convertMultiParagraphFileToArray("./testInput.dat");

  return input;
};
