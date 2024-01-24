export type Category = `x` | `m` | `a` | `s`;

export interface Rule {
  category: Category;
  comparison: `>` | `<`;
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

export interface ParsedInput {
  workflows: Workflow[];
  parts: Part[];
}
