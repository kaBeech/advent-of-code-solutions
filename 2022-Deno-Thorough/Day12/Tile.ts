import { xyCoordinatesGetter } from "../../tools/commonMethods/getMethods.ts";
import { XYCoordinates } from "../../tools/commonTypes.ts";
import { getCartesianDistanceXY } from "../../tools/mathFunctions/getCartesianDistance.ts";
import { TileMap, TileType } from "./types.ts";

interface TileState {
  coordinates: XYCoordinates;
  elevation: string;
  nextSteps: TileType[];
  distanceFromStart: number | undefined;
  tileMap: TileMap;
}

const elevationGetter = (state: TileState) => ({
  getElevation: () => state.elevation,
});

const nextStepsGetter = (
  state: TileState,
) => ({
  getNextSteps: () => {
    if (!state.nextSteps) {
      const adjacentTiles = [
        state.tileMap.tileMap[state.coordinates.y - 1][state.coordinates.x],
        state.tileMap.tileMap[state.coordinates.y + 1][state.coordinates.x],
        state.tileMap.tileMap[state.coordinates.y][state.coordinates.x - 1],
        state.tileMap.tileMap[state.coordinates.y][state.coordinates.x + 1],
      ];
      const accessibleAdjacentTiles = adjacentTiles.filter((tile) =>
        tile.getElevation() > state.elevation
      );
      state.nextSteps = accessibleAdjacentTiles
        .sort((a, b) => {
          return a.getDistanceFromStart() -
            b.getDistanceFromStart();
        });
    }
    return state.nextSteps;
  },
});

const distanceFromStartGetter = (state: TileState) => ({
  getDistanceFromStart: () => {
    !state.distanceFromStart &&
      (state.distanceFromStart = getCartesianDistanceXY(
        state.coordinates,
        state.tileMap.startTile.getCoordinates(),
      ));
    return state.distanceFromStart;
  },
});

const Tile = (
  coordinates: XYCoordinates,
  elevation: string,
  tileMap: TileMap,
) => {
  const state = {
    coordinates,
    elevation,
    tileMap,
    nextSteps: [] as TileType[],
    distanceFromStart: undefined as number | undefined,
  };

  return {
    ...xyCoordinatesGetter(state),
    ...elevationGetter(state),
    ...nextStepsGetter(state),
    ...distanceFromStartGetter(state),
  };
};

export { Tile };
