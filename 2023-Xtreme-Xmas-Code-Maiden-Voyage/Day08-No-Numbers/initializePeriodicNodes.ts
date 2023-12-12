import { Instruction, PeriodicNode } from "./types.ts";

export default (currentInstructions: Instruction[]) => {
  const periodicNodes: PeriodicNode[] = [];
  const harmonizedNodes: PeriodicNode[] = [];
  for (const currentInstruction of currentInstructions) {
    let distanceFromNextEndingNode = currentInstruction
      .distanceFromNextEndingNode!;
    const period = currentInstruction.nextEndingNode!
      .distanceFromNextEndingNode!;
    if (distanceFromNextEndingNode === period) {
      distanceFromNextEndingNode = 0;
    }
    const periodicNode = {
      endingNodeId: currentInstruction.nextEndingNode!.id,
      period,
      distanceFromNextEndingNode,
    };
    periodicNodes.push(periodicNode);
    if (periodicNode.distanceFromNextEndingNode === 0) {
      harmonizedNodes.push(periodicNode);
    }
  }
  return { periodicNodes, harmonizedNodes };
};
