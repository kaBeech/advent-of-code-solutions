import { XYCoordinate } from "../../tools/commonTypes.ts";
import { TileType } from "./types.ts";

interface ExplorerState {
  startCoordinates: XYCoordinate;
  endCoordinates: XYCoordinate;
  currentPath: TileType[];
  shortestPathLength: number | undefined;
  availableMoves: TileType[];
  backtrackedFrom: TileType | undefined;
}

const move = (state: ExplorerState, destination: TileType) => {
  state.backtrackedFrom = undefined;
  state.currentPath.push(destination);
};

const backtrack = (state: ExplorerState) => {
  state.backtrackedFrom = state.currentPath.pop();
};

const explorer = (state: ExplorerState) => ({
  explore: () => 42,
});

const Explorer = (
  startCoordinates: XYCoordinate,
  endCoordinates: XYCoordinate,
) => {
  const state = {
    startCoordinates,
    endCoordinates,
    currentPath: [],
    shortestPathLength: undefined,
    availableMoves: [],
    backtrackedFrom: undefined,
  };

  return {
    ...explorer(state),
  };
};

export { Explorer };
