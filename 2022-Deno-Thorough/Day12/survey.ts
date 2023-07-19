import { getAdjacentTiles } from "./getAdjacentTiles.ts";
import { TileType } from "./types.ts";

export { survey };

const survey = (
  allTiles: TileType[][],
  currentTile: TileType,
  destinationTile: TileType,
) => {
  const result = {
    foundDestinationTile: false,
    foundLowestPossibleElevation: false,
    tilesToVisit: [] as TileType[],
    fewestStepsToLowestPossibleElevation: undefined as number | undefined,
  };

  if (currentTile.getFewestSteps() === undefined) {
    currentTile.setFewestSteps(0);
  }
  const adjacentTiles = getAdjacentTiles(
    allTiles,
    currentTile.getCoordinates().x,
    currentTile.getCoordinates().y,
  );
  const accessibleTiles = adjacentTiles.filter((tile) =>
    tile.getElevation() >= currentTile.getElevation() - 1
  );

  if (accessibleTiles.includes(destinationTile)) {
    result.foundDestinationTile = true;
    destinationTile.setFewestSteps(
      currentTile.getFewestSteps()! +
        1,
    );
    return result;
  }

  accessibleTiles.forEach((tile) => {
    if (
      tile.getFewestSteps() === undefined ||
      tile.getFewestSteps()! > currentTile.getFewestSteps()! + 1
    ) {
      tile.setFewestSteps(currentTile.getFewestSteps()! + 1);
      result.tilesToVisit.push(tile);
    }
    if (
      tile.getElevation() === 1 &&
      !(result.fewestStepsToLowestPossibleElevation! <= tile.getFewestSteps()!)
    ) {
      result.foundLowestPossibleElevation = true;
      result.fewestStepsToLowestPossibleElevation = tile.getFewestSteps();
    }
  });
  return result;
};
