import { XYCoordinate } from "../../tools/commonTypes.ts";
import { getCartesianDistanceXY } from "../../tools/mathFunctions/getCartesianDistance.ts";
import { TileType } from "./types.ts";

interface TileState {
  coordinates: XYCoordinate;
  elevation: string;
  accessibleAdjacentTilesByPreference: TileType[];
  distanceFromStart: number | undefined;
}

const coordinatesGetter = (state: TileState) => ({
  getCoordinates: () => state.coordinates,
});

const elevationGetter = (state: TileState) => ({
  getElevation: () => state.elevation,
});

const accessibleAdjacentTilesByPreferenceGetter = (state: TileState) => ({
  getAccessibleAdjacentTilesByPreference: () =>
    state.accessibleAdjacentTilesByPreference,
});

const distanceFromStartGetter = (state: TileState) => ({
  getDistanceFromStart: (startCoordinates: XYCoordinate) => {
    !state.distanceFromStart &&
      (state.distanceFromStart = getCartesianDistanceXY(
        state.coordinates,
        startCoordinates,
      ));
    return state.distanceFromStart;
  },
});

const Tile = (
  coordinates: XYCoordinate,
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
