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
