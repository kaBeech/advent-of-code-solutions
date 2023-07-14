import { coordinatesGetter } from "../../tools/commonMethods/getMethods.ts";
import { XYCoordinates } from "../../tools/commonTypes.ts";
import { getCartesianDistanceXY } from "../../tools/mathFunctions/getCartesianDistance.ts";
import { TileType } from "./types.ts";

interface TileState {
  coordinates: XYCoordinates;
  elevation: string;
  accessibleAdjacentTilesByPreference: TileType[];
  distanceFromStart: number | undefined;
}

const elevationGetter = (state: TileState) => ({
  getElevation: () => state.elevation,
});

// setAccessibleAdjacentTilesByPreference if not already set
const accessibleAdjacentTilesByPreferenceGetter = (state: TileState) => ({
  getAccessibleAdjacentTilesByPreference: () =>
    state.accessibleAdjacentTilesByPreference,
});

const distanceFromStartGetter = (state: TileState) => ({
  getDistanceFromStart: (startCoordinates: XYCoordinates) => {
    !state.distanceFromStart &&
      (state.distanceFromStart = getCartesianDistanceXY(
        state.coordinates,
        startCoordinates,
      ));
    return state.distanceFromStart;
  },
});

const Tile = (
  coordinates: XYCoordinates,
  elevation: string,
) => {
  const state = {
    coordinates,
    elevation,
    accessibleAdjacentTilesByPreference: [] as TileType[],
    distanceFromStart: undefined as number | undefined,
  };

  return {
    ...coordinatesGetter(state),
    ...elevationGetter(state),
    ...accessibleAdjacentTilesByPreferenceGetter(state),
    ...distanceFromStartGetter(state),
  };
};

export { Tile };
