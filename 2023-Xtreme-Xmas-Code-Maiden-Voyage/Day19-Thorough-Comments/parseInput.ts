import { convertMultiParagraphFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { Category, ParsedInput, Part, Rule, Workflow } from "./types.ts";

export default async (): Promise<ParsedInput> => {
  const input = await convertMultiParagraphFileToArray("./testInput.dat");

  const rawWorkflows = input[0];
  const rawParts = input[1];
  const workflows: Workflow[] = [];
  const parts: Part[] = [];

  // Parse the rawWorkflows into Workflow objects.
  for (const rawWorkflow of rawWorkflows) {
    // Get the workflow name from the rawWorkflow string.
    let splitWorkflow = rawWorkflow.split("{");
    const workflowName = splitWorkflow[0];
    // Remove the `}` from the end of the rawWorkflow string and split the string into an array of rules.
    splitWorkflow = splitWorkflow[1].slice(0, -1).split(",");
    // Remove the end destination from the rawWorkflow string and store it separately.
    const endDestination = splitWorkflow.pop()!;
    const rules: Rule[] = [];
    for (let rawRule of splitWorkflow) {
      // Remove the destination from the rawRule string and store it separately.
      const rawRuleSplit = rawRule.split(":");
      const destination = rawRuleSplit[1];
      rawRule = rawRuleSplit[0];
      // Construct the rule object.
      const parsedRule = {
        workflowName,
        index: rules.length,
        category: rawRule[0] as Category,
        comparison: rawRule[1] as `>` | `<`,
        value: +rawRule.slice(2),
        destination,
      };
      // Add the resulting rule to the rules array.
      rules.push(parsedRule);
    }
    // Add the resulting workflow to the workflows array.
    workflows.push({
      name: workflowName,
      rules,
      endDestination,
    });
  }

  // Parse the rawParts into Part objects.
  for (let rawPart of rawParts) {
    // convert the raw input into a string that can be parsed with JSON.parse()
    rawPart = rawPart.replace(/=/g, `: "`).replace(/,/g, `", `).replace(
      /{/g,
      `{ `,
    ).replace(/x/g, `"x"`).replace(/m/g, `"m"`).replace(/a/g, `"a"`).replace(
      /s/g,
      `"s"`,
    ).replace(/}/g, `" }`);
    // Use JSON to parse the resulting rawPart string into a Part object.
    parts.push(JSON.parse(rawPart));
  }

  return { workflows, parts };
};
