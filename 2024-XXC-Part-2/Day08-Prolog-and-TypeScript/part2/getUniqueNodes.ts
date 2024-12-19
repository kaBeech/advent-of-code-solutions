import { AntennaMap, NodeDict } from "./types.ts";

export default (
  antennaMap: AntennaMap,
): number[] => {
  const nodesDict: NodeDict = {};
  antennaMap.antennas.forEach((antenna) => {
    if (!nodesDict[antenna.coordinates.x.toString()]) {
      nodesDict[antenna.coordinates.x.toString()] = [antenna.coordinates.y];
    } else {
      nodesDict[antenna.coordinates.x.toString()].push(antenna.coordinates.y);
    }
  });
  const nodes: number[] = [];
  for (const key in nodesDict) {
    for (const node of nodesDict[key]) {
      nodes.push(node);
    }
  }
  return nodes;
};
