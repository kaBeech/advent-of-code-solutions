import { Antenna, AntennaMap, NodeDict } from "./types.ts";

export default (
  antennaMap: AntennaMap,
): number[] => {
  let nodeDict: NodeDict = {};
  let freqsScanned: string[] = [];
  antennaMap.antennas.forEach((antenna) => {
    [nodeDict, freqsScanned] = getNodes(antenna, antennaMap, nodeDict, freqsScanned);
  });
  let nodes: number[] = [];
  for (const key in nodeDict) {
    nodes = nodes.concat(nodeDict[key]);
  }
  return nodes;
};

const getNodes = (
  antenna: Antenna,
  antennaMap: AntennaMap,
  nodeDict: NodeDict,
  freqsScanned: string[]
): [NodeDict, string[]] => {
  if (freqsScanned.includes(antenna.frequency)) {
    return [nodeDict, freqsScanned];
  }
  const matchingAntennas = antennaMap.antennas.filter((a) =>
    a.frequency === antenna.frequency &&
    !(a.coordinates.x === antenna.coordinates.x &&
      a.coordinates.y === antenna.coordinates.y));
  matchingAntennas.forEach((matchingAntenna) => {
    nodeDict = getNodesFromAntennaPair(antenna, matchingAntenna, nodeDict);
  });
  return [nodeDict, freqsScanned];
}
