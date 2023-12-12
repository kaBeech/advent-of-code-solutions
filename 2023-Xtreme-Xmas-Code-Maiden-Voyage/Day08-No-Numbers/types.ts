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

export interface PeriodicNode {
  endingNodeId: string;
  period: number;
  distanceFromNextEndingNode: number;
  cyclesSinceLastHarmonization: number;
}
