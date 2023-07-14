import { XYCoordinates } from "../commonTypes.ts";

const nameGetter = (state: { name: string }) => ({
  getName: () => state.name,
});

const xyCoordinatesGetter = (state: { coordinates: XYCoordinates }) => ({
  getCoordinates: () => state.coordinates,
});

export { nameGetter, xyCoordinatesGetter };
