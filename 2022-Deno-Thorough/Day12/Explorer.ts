import { TileType } from "./types.ts";

interface ExplorerState {
  startTile: TileType;
  endTile: TileType;
  currentPath: TileType[];
  shortestPathLength: number | undefined;
  backtrackedFrom: TileType | undefined;
}

const explorer = (state: ExplorerState) => ({
  explore: () => explore(state),
});

const explore = (state: ExplorerState): number => {
  const availableMoves = getAvailableMoves(state);

  if (availableMoves.length === 0) {
    if (state.currentPath[0] === state.endTile) {
      return state.shortestPathLength as number;
    } else {
      backtrack(state);
      return explore(state);
    }
  }

  if (availableMoves.includes(state.startTile)) {
    state.shortestPathLength = state.currentPath.length;
    backtrack(state);
    backtrack(state);
    return explore(state);
  }

  if (
    state.shortestPathLength &&
    (state.currentPath.length >= (state.shortestPathLength - 3))
  ) {
    backtrack(state);
    return explore(state);
  }
  move(state, availableMoves[0]);
  return explore(state);
};

const getAvailableMoves = (state: ExplorerState): TileType[] => {
  const accessibleTilesNotInCurrentPath = state.currentPath[0]
    .getAccessibleAdjacentTilesByPreference().filter((tile) =>
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
  availableMoves: TileType[],
) => {
  if (
    state.backtrackedFrom && availableMoves.includes(state.backtrackedFrom)
  ) {
    while (availableMoves.includes(state.backtrackedFrom)) {
      availableMoves.shift();
    }
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
};

const Explorer = (
  startTile: TileType,
  endTile: TileType,
) => {
  const state = {
    startTile,
    endTile,
    currentPath: [endTile],
    shortestPathLength: undefined,
    backtrackedFrom: undefined,
  };

  return {
    ...explorer(state),
  };
};

export { Explorer };
