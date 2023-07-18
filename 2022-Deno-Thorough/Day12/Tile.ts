import { xyCoordinatesGetter } from "../../tools/commonMethods/getMethods.ts";
import { XYCoordinates } from "../../tools/commonTypes.ts";
import { TileType } from "./types.ts";

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

// const adjacentTilesByPreferenceGetter = (
//   state: TileState,
// ) => ({
//   getAdjacentTilesByPreference: () => {
//     if (!state.tileSurveyed) {
//       const adjacentTiles = getAdjacentTiles(
//         state.tileMap.allTiles,
//         state.coordinates.x,
//         state.coordinates.y,
//       );
//       const accessibleAdjacentTiles = adjacentTiles.filter((tile) =>
//         tile.getElevation() >= state.elevation - 1
//       );
//       state.adjacentTilesByPreference = accessibleAdjacentTiles
//         .sort((a, b) => {
//           return a.getDistanceFromFinish() -
//             b.getDistanceFromFinish();
//         })
//         .sort((a, b) => {
//           return a.getElevation() - b.getElevation();
//         });
//       state.tileSurveyed = true;
//     }
//     return state.adjacentTilesByPreference;
//   },
// });

// const getAdjacentTiles = (allTiles: TileType[][], x: number, y: number) => {
//   const adjacentCoordinates = [[x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]];
//   const adjacentTiles: TileType[] = [];
//   adjacentCoordinates.forEach(([x, y]) => {
//     if (x >= 0 && y >= 0 && x < allTiles[0].length && y < allTiles.length) {
//       adjacentTiles.push(allTiles[y][x]);
//     }
//   });
//   return adjacentTiles;
// };
