import { HeightWidth, XYCoordinates } from "../../../tools/commonTypes.ts";
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
    nodeDict = getNodesFromAntennaPair(antenna, matchingAntenna, antennaMap.hw, nodeDict);
  });
  return [nodeDict, freqsScanned];
}

const getNodesFromAntennaPair = (
  antenna1: Antenna,
  antenna2: Antenna,
  hw: HeightWidth,
  nodeDict: NodeDict,
): NodeDict => {
  const deltaX = antenna2.coordinates.x - antenna1.coordinates.x;
  const deltaY = antenna2.coordinates.y - antenna1.coordinates.y;
  let currentCoords = antenna1.coordinates;
  nodeDict = getNodesInOneDirection(currentCoords, { x: deltaX, y: deltaY }, hw, nodeDict);
  currentCoords = { x: antenna1.coordinates.x - deltaX, y: antenna1.coordinates.y - deltaY };
  nodeDict = getNodesInOneDirection(currentCoords, { x: -deltaX, y: -deltaY }, hw, nodeDict);
  return nodeDict;
}

const getNodesInOneDirection = (
  coords: XYCoordinates,
  delta: XYCoordinates,
  hw: HeightWidth,
  nodeDict: NodeDict,
): NodeDict => {
  let currentCoords = coords;
  while (isInRange(currentCoords, hw)) {
    nodeDict = addNode(nodeDict, currentCoords.x, currentCoords.y);
    currentCoords = { x: currentCoords.x + delta.x, y: currentCoords.y + delta.y };
  }
  return nodeDict;
}

const isInRange = (coords: XYCoordinates, hw: HeightWidth): boolean => {
  return coords.x >= 0 && coords.x < hw.width && coords.y >= 0 && coords.y < hw.height;
}

const addNode = (nodeDict: NodeDict, x: number, y: number): NodeDict => {
  if (!nodeDict[x.toString()]) {
    nodeDict[x.toString()] = [y];
  } else if (!nodeDict[x.toString()].includes(y)) {
    nodeDict[x.toString()].push(y);
  }
  return nodeDict;
}
