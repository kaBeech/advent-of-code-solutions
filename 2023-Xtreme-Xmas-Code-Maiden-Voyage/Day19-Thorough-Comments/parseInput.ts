import { convertMultiParagraphFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { ParsedInput, Part } from "./types.ts";

export default async (): Promise<ParsedInput> => {
  const input = await convertMultiParagraphFileToArray("./testInput.dat");

  const rawWorkflows = input[0];
  const rawParts = input[1];
  const parts: Part[] = [];

  for (let rawPart of rawParts) {
    rawPart = rawPart.replace(/=/g, `: "`).replace(/,/g, `", `).replace(
      /{/g,
      `{ `,
    ).replace(/x/g, `"x"`).replace(/m/g, `"m"`).replace(/a/g, `"a"`).replace(
      /s/g,
      `"s"`,
    ).replace(/}/g, `" }`);
    parts.push(JSON.parse(rawPart));
  }

  console.log(rawWorkflows, parts);

  return input;
};
