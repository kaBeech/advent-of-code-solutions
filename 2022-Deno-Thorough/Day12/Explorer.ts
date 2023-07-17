import { TileType } from "./types.ts";

interface ExplorerState {
  startTile: TileType;
  endTile: TileType;
  currentPath: TileType[];
  explorationComplete: boolean;
  longestPathLength: number;
  shortestPathLength: number | undefined;
  backtrackedFrom: TileType | undefined;
  lowestElevation: number;
}

const explorer = (state: ExplorerState) => ({
  explore: () => {
    while (!state.explorationComplete) {
      explore(state);
    }
    return state.shortestPathLength as number;
  },
});

const explore = (state: ExplorerState) => {
  const availableMoves = getAvailableMoves(state);

  if (availableMoves.length < 1) {
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

const getAvailableMoves = (state: ExplorerState): TileType[] => {
  const accessibleTilesNotInCurrentPath = state.currentPath[0]
    .getNextSteps().filter((tile) => !state.currentPath.includes(tile));
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
  if (state.currentPath[0].getElevation() === 11) {
  }
};

const Explorer = (
  startTile: TileType,
  endTile: TileType,
) => {
  const state = {
    startTile,
    endTile,
    currentPath: [startTile],
    explorationComplete: false,
    shortestPathLength: undefined,
    backtrackedFrom: undefined,
    lowestElevation: startTile.getElevation(),
    longestPathLength: 0,
  };

  return {
    ...explorer(state),
  };
};

export { Explorer };
