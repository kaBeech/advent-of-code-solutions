import { xyCoordinatesGetter } from "../../tools/commonMethods/getMethods.ts";
import { XYCoordinates } from "../../tools/commonTypes.ts";
import { getCartesianDistanceXY } from "../../tools/mathFunctions/getCartesianDistance.ts";
import { TileMap, TileType } from "./types.ts";

interface TileState {
  coordinates: XYCoordinates;
  elevation: number;
  tileSurveyed: boolean;
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
    if (!state.tileSurveyed) {
      const adjacentTiles = getAdjacentTiles(
        state.tileMap.allTiles,
        state.coordinates.x,
        state.coordinates.y,
      );
      const accessibleAdjacentTiles = adjacentTiles.filter((tile) =>
        tile.getElevation() > state.elevation
      );
      state.nextSteps = accessibleAdjacentTiles
        .sort((a, b) => {
          return a.getDistanceFromStart() -
            b.getDistanceFromStart();
        });
      state.tileSurveyed = true;
    }
    return state.nextSteps;
  },
});

const getAdjacentTiles = (allTiles: TileType[][], x: number, y: number) => {
  const adjacentCoordinates = [[x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]];
  const adjacentTiles: TileType[] = [];
  adjacentCoordinates.forEach(([x, y]) => {
    if (allTiles[y]?.[x] !== undefined) {
      adjacentTiles.push(allTiles[y][x]);
    }
  });
  return adjacentTiles;
};

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
  elevation: number,
  tileMap: TileMap,
) => {
  const state = {
    coordinates,
    elevation,
    tileMap,
    tileSurveyed: false,
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
