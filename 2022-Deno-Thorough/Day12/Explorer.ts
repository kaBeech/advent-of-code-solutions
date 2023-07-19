import { survey } from "./survey.ts";
import { TileMap, TileType } from "./types.ts";

interface ExplorerState {
  tileMap: TileMap;
  currentTile: TileType;
  destinationTile: TileType;
  destinationTileVisited: boolean;
  lowestPossibleElevationVisited: boolean;
  fewestStepsToLowestPossibleElevation: number | undefined;
  queuedTiles: TileType[];
}

export { Explorer };
export type { ExplorerState };

const Explorer = (
  tileMap: TileMap,
) => {
  const state = {
    tileMap,
    // Start from the End, work towards the Start
    currentTile: tileMap.endTile,
    destinationTile: tileMap.startTile,
    destinationTileVisited: false,
    lowestPossibleElevationVisited: false,
    fewestStepsToLowestPossibleElevation: undefined,
    queuedTiles: [tileMap.endTile],
  };

  return {
    ...shortestPathToDestinationFinder(state),
    ...shortestPathToLowestElevationFinder(state),
  };
};

const shortestPathToDestinationFinder = (state: ExplorerState) => ({
  findShortestPathToDestination: () => {
    while (!state.destinationTileVisited) {
      survey(state);
    }
    return state.destinationTile.getFewestSteps();
  },
});

const shortestPathToLowestElevationFinder = (state: ExplorerState) => ({
  findShortestPathToLowestElevation: () => {
    while (!state.destinationTileVisited) {
      survey(state);
    }
    return state.fewestStepsToLowestPossibleElevation;
  },
});
