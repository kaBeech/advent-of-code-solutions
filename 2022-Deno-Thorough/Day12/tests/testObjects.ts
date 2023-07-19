import { Explorer } from "../Explorer.ts";
import { populateTileMap } from "../populateTileMap.ts";

const testTileMap = await populateTileMap("tests/testInput.txt");

const testExplorerState = {
  tileMap: testTileMap,
  currentTile: testTileMap.endTile,
  destinationTile: testTileMap.startTile,
  destinationTileVisited: false,
  lowestPossibleElevationVisited: false,
  fewestStepsToLowestPossibleElevation: undefined,
  queuedTiles: [testTileMap.endTile],
};

const testExplorerStateOnCornerTile = {
  tileMap: testTileMap,
  currentTile: testTileMap.allTiles[0][0],
  destinationTile: testTileMap.startTile,
  destinationTileVisited: false,
  lowestPossibleElevationVisited: false,
  fewestStepsToLowestPossibleElevation: undefined,
  queuedTiles: [testTileMap.allTiles[0][0]],
};

const testExplorerStateOnSideTile = {
  tileMap: testTileMap,
  currentTile: testTileMap.allTiles[0][1],
  destinationTile: testTileMap.startTile,
  destinationTileVisited: false,
  lowestPossibleElevationVisited: false,
  fewestStepsToLowestPossibleElevation: undefined,
  queuedTiles: [testTileMap.allTiles[0][1]],
};

const testExplorer = Explorer(testTileMap);

export {
  testExplorer,
  testExplorerState,
  testExplorerStateOnCornerTile,
  testExplorerStateOnSideTile,
  testTileMap,
};
