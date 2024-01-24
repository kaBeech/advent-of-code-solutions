export type Category = `x` | `m` | `a` | `s`;

export type Comparison = `>` | `<`;

export interface Rule {
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

export interface Part {
  x: number;
  m: number;
  a: number;
  s: number;
}

export interface EvaluationResult {
  category: Category;
  value: number;
  passes: boolean;
}

export interface ParsedInput {
  workflows: Workflow[];
  parts: Part[];
}
