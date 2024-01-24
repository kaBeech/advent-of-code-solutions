import { convertMultiParagraphFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { ParsedInput, Part, Workflow } from "./types.ts";

export default async (): Promise<ParsedInput> => {
  const input = await convertMultiParagraphFileToArray("./testInput.dat");

  const rawWorkflows = input[0];
  const rawParts = input[1];
  const workflows: Workflow[] = [];
  const parts: Part[] = [];

  for (let rawWorkflow of rawWorkflows) {
    const splitWorkflow = rawWorkflow.split("{");
    const workflowName = rawWorkflow.split("{")[0];
  }

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
