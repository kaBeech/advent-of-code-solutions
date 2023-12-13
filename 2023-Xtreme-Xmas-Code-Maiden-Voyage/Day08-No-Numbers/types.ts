export interface Instruction {
  id: string;
  l: string;
  r: string;
}

export interface Maps {
  directions: string;
  instructions: Instruction[];
}

export interface PeriodicNode {
  endingNodeId: string;
  period: number;
  distanceFromNextEndingNode: number;
}
