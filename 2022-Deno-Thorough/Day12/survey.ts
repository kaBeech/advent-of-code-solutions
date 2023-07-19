import { ExplorerState } from "./Explorer.ts";
import { getAdjacentTiles } from "./getAdjacentTiles.ts";

export { survey };

const survey = (state: ExplorerState) => {
  state.currentTile = state.queuedTiles.shift()!;
  if (state.currentTile.getFewestSteps() === undefined) {
    state.currentTile.setFewestSteps(0);
  }
  const adjacentTiles = getAdjacentTiles(state);
  const accessibleTiles = adjacentTiles.filter((tile) =>
    tile.getElevation() >= state.currentTile.getElevation() - 1
  );

  if (accessibleTiles.includes(state.destinationTile)) {
    state.destinationTileVisited = true;
    state.destinationTile.setFewestSteps(
      state.currentTile.getFewestSteps()! +
        1,
    );
    return;
  }

  accessibleTiles.forEach((tile) => {
    if (
      tile.getFewestSteps() === undefined ||
      tile.getFewestSteps()! > state.currentTile.getFewestSteps()! + 1
    ) {
      tile.setFewestSteps(state.currentTile.getFewestSteps()! + 1);
      state.queuedTiles.push(tile);
    }
    if (
      tile.getElevation() === 1 &&
      !(state.fewestStepsToLowestPossibleElevation! <= tile.getFewestSteps()!)
    ) {
      state.lowestPossibleElevationVisited = true;
      state.fewestStepsToLowestPossibleElevation = tile.getFewestSteps();
    }
  });
};
