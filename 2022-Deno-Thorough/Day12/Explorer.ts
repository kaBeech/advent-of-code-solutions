import { TileMap, TileType } from "./types.ts";

interface ExplorerState {
  tileMap: TileMap;
  currentTile: TileType;
  destinationTile: TileType;
  destinationTileVisited: boolean;
  queuedTiles: TileType[];
}

export { Explorer };

const Explorer = (
  tileMap: TileMap,
) => {
  const state = {
    tileMap,
    currentTile: tileMap.endTile,
    destinationTile: tileMap.startTile,
    destinationTileVisited: false,
    queuedTiles: [tileMap.endTile],
  };

  return {
    ...shortestPathToDestinationFinder(state),
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

const survey = (state: ExplorerState) => {
  state.currentTile = state.queuedTiles.shift()!;
  if (state.currentTile.getFewestSteps() === undefined) {
    state.currentTile.setFewestSteps(0);
  }
  const adjacentTiles = getAdjacentTiles(state);
  const accessibleTiles = adjacentTiles.filter((tile) =>
    tile.getElevation() >= state.currentTile.getElevation() - 1
  );

  if (accessibleTiles.includes(state.destinationTile)) {
    state.destinationTileVisited = true;
    state.destinationTile.setFewestSteps(
      state.currentTile.getFewestSteps() as number +
        1,
    );
    return;
  }

  if (availableMoves.length === 0) {
    if (state.currentPath[0] === state.startTile) {
      state.explorationComplete = true;
      return;
    } else {
      backtrack(state);
      return;
    }
  }

  if (availableMoves.includes(state.endTile)) {
    state.shortestPathLength = state.currentPath.length;
    backtrack(state);
    backtrack(state);
    return;
  }

  if (
    state.shortestPathLength &&
    (state.currentPath.length > (state.shortestPathLength - 2))
  ) {
    backtrack(state);
    return;
  }
  move(state, availableMoves[0]);
  return;
};

const getAdjacentTiles = (state: ExplorerState) => {
  const allTiles = state.tileMap.allTiles;
  const x = state.currentTile.getCoordinates().x;
  const y = state.currentTile.getCoordinates().y;

  const adjacentCoordinates = [[x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]];
  const adjacentTiles: TileType[] = [];

  adjacentCoordinates.forEach(([x, y]) => {
    if (x >= 0 && y >= 0 && x < allTiles[0].length && y < allTiles.length) {
      adjacentTiles.push(allTiles[y][x]);
    }
  });
  return adjacentTiles;
};

const getAvailableMoves = (state: ExplorerState): TileType[] => {
  const accessibleTilesNotInCurrentPath = state.currentPath[0]
    .getAdjacentTilesByPreference().filter((tile) =>
      !state.currentPath.includes(tile)
    );
  const availableMoves = removePathsAlreadyTaken(
    state,
    accessibleTilesNotInCurrentPath,
  );
  return availableMoves;
};

const removePathsAlreadyTaken = (
  state: ExplorerState,
  tiles: TileType[],
) => {
  const availableMoves = tiles.slice();
  while (
    state.backtrackedFrom && availableMoves.includes(state.backtrackedFrom)
  ) {
    availableMoves.shift();
  }
  return availableMoves;
};

const backtrack = (state: ExplorerState) => {
  state.backtrackedFrom = state.currentPath.shift();
};

const move = (state: ExplorerState, destination: TileType) => {
  state.backtrackedFrom = undefined;
  state.currentPath.unshift(destination);
  if (state.currentPath[0].getElevation() < state.lowestElevation) {
    state.lowestElevation = state.currentPath[0].getElevation();
  }
  if (state.currentPath.length > state.longestPathLength) {
    state.longestPathLength = state.currentPath.length;
  }
};
