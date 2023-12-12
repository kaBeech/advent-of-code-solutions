export interface Instruction {
  id: string;
  l: string;
  r: string;
  lastEndingNode?: Instruction;
  distanceFromLastEndingNode?: number;
  nextEndingNode?: Instruction;
  distanceFromNextEndingNode?: number;
}

export interface Maps {
  directions: string;
  instructions: Instruction[];
}
