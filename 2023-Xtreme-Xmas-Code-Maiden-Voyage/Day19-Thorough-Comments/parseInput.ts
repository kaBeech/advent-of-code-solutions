import { convertMultiParagraphFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { Category, ParsedInput, Part, Rule, Workflow } from "./types.ts";

export default async (): Promise<ParsedInput> => {
  const input = await convertMultiParagraphFileToArray("./testInput.dat");

  const rawWorkflows = input[0];
  const rawParts = input[1];
  const workflows: Workflow[] = [];
  const parts: Part[] = [];

  for (const rawWorkflow of rawWorkflows) {
    let splitWorkflow = rawWorkflow.split("{");
    const workflowName = rawWorkflow.split("{")[0];
    splitWorkflow = splitWorkflow[1].slice(0, -1).split(",");
    const endDestination = splitWorkflow.pop()!;
    const rules: Rule[] = [];
    for (let rawRule of splitWorkflow) {
      const rawRuleSplit = rawRule.split(":");
      const destination = rawRuleSplit[1];
      rawRule = rawRuleSplit[0];
      const rule: Rule = {
        category: rawRule[0] as Category,
        comparison: rawRule[1] as `>` | `<`,
        value: +rawRule.slice(2),
        destination,
      };
      rules.push(rule);
    }
    workflows.push({
      name: workflowName,
      rules,
      endDestination,
    });
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

  return { workflows, parts };
};
