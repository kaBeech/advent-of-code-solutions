import { TileType } from "./types.ts";

interface ExplorerState {
  startTile: TileType;
  endTile: TileType;
  currentPath: TileType[];
  shortestPathLength: number | undefined;
  backtrackedFrom: TileType | undefined;
}

const move = (state: ExplorerState, destination: TileType) => {
  state.backtrackedFrom = undefined;
  state.currentPath.unshift(destination);
};

const backtrack = (state: ExplorerState) => {
  state.backtrackedFrom = state.currentPath.shift();
};

const explorer = (state: ExplorerState) => ({
  explore: (): number => {
    const availableMoves = state.currentPath[0]
      .getAccessibleAdjacentTilesByPreference().filter((tile) =>
        !state.currentPath.includes(tile)
      );

    if (
      state.backtrackedFrom && availableMoves.includes(state.backtrackedFrom)
    ) {
      while (availableMoves.includes(state.backtrackedFrom)) {
        availableMoves.shift();
      }
      availableMoves.shift();
    }

    if (availableMoves.length === 0) {
      if (state.currentPath.length === 1) {
        return state.shortestPathLength as number;
      } else {
        backtrack(state);
      }
    }
    return 42;
  },
});

const Explorer = (
  startTile: TileType,
  endTile: TileType,
) => {
  const state = {
    startTile,
    endTile,
    currentPath: [],
    shortestPathLength: undefined,
    backtrackedFrom: undefined,
  };

  return {
    ...explorer(state),
  };
};

export { Explorer };
