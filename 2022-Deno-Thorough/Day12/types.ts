import { XYCoordinates } from "../../tools/commonTypes.ts";

interface TileType {
  // ...coordinatesGetter(state),
  // ...elevationGetter(state),
  // ...accessibleAdjacentTilesByPreferenceGetter(state),
  // ...distanceFromStartGetter(state),
  getCoordinates: () => XYCoordinates;
  getElevation: () => number;
  getAccessibleAdjacentTilesByPreference: () => TileType[];
  getDistanceFromStart: (startCoordinates: XYCoordinates) => number;
}

export type { TileType };
