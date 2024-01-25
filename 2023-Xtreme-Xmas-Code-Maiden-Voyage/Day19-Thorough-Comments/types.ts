import { MinMax } from "../../tools/commonTypes.ts";

export type Category = `x` | `m` | `a` | `s`;

export type Comparison = `>` | `<`;

export interface Rule {
  workflowName: string;
  index: number;
  category: Category;
  comparison: Comparison;
  value: number;
  destination: string;
}

export interface Workflow {
  name: string;
  rules: Rule[];
  endDestination: string;
}

export interface ProcessedWorkflow {
  name: string;
  acceptablePartsRanges: AcceptablePartsRange[];
}

export interface AcceptablePartsRange {
  x: MinMax;
  m: MinMax;
  a: MinMax;
  s: MinMax;
}

export interface EndingFilter {
  workflowName: string;
  index: number;
  acceptablePartsRange: AcceptablePartsRange | null;
}

export interface Part {
  x: number;
  m: number;
  a: number;
  s: number;
}

export interface RuleInstance {
  rule: Rule;
  partBeingProcessed: Part;
}

export interface EvaluationResult {
  category: Category;
  value: number;
  passes: boolean;
  ruleStack: RuleInstance[];
  lastPartProcessed: Part;
}

export interface ParsedInput {
  workflows: Workflow[];
  parts: Part[];
}
