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
  let nodes: number[] = [];
  for (const key in nodesDict) {
    nodes = nodes.concat(nodesDict[key]);
  }
  return nodes;
};
