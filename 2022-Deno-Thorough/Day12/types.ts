import { XYCoordinate } from "../../tools/commonTypes.ts";

interface TileType {
  // ...coordinatesGetter(state),
  // ...elevationGetter(state),
  // ...accessibleAdjacentTilesByPreferenceGetter(state),
  // ...distanceFromStartGetter(state),
  getCoordinates: () => XYCoordinate;
  getElevation: () => number;
  getAccessibleAdjacentTilesByPreference: () => TileType[];
  getDistanceFromStart: (startCoordinates: XYCoordinate) => number;
}

export type { TileType };
