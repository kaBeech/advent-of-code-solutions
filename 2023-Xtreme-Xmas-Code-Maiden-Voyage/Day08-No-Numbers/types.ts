export interface Instruction {
  id: string;
  l: string;
  r: string;
}

export interface Maps {
  directions: string;
  instructions: Instruction[];
}
