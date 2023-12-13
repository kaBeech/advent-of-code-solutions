export interface TypeInstruction {
  id: string;
  l: string;
  r: string;
}

export interface TypeMaps {
  directions: string;
  instructions: TypeInstruction[];
}

export interface TypePeriodicNode {
  endingNodeId: string;
  period: string;
}
