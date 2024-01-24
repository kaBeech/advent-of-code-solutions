export interface Rule {
  category: `x` | `m` | `a` | `s`;
  comparison: `>` | `<`;
  value: number;
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
  workflows: string[];
  parts: Part[];
}
