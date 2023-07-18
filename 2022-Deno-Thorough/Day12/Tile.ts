import { xyCoordinatesGetter } from "../../tools/commonMethods/getMethods.ts";
import { XYCoordinates } from "../../tools/commonTypes.ts";

interface TileState {
  coordinates: XYCoordinates;
  elevation: number;
  fewestSteps: number | undefined;
}

export { Tile };

const Tile = (
  coordinates: XYCoordinates,
  elevation: number,
) => {
  const state = {
    coordinates,
    elevation,
    fewestSteps: undefined,
  };

  return {
    ...elevationGetter(state),
    ...xyCoordinatesGetter(state),
    ...fewestStepsGetter(state),
    ...fewestStepsSetter(state),
  };
};

const elevationGetter = (state: TileState) => ({
  getElevation: () => state.elevation,
});

const fewestStepsGetter = (state: TileState) => ({
  getFewestSteps: () => state.fewestSteps,
});

const fewestStepsSetter = (state: TileState) => ({
  setFewestSteps: (fewestSteps: number) => {
    state.fewestSteps = fewestSteps;
  },
});
