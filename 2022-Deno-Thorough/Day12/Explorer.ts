import { TileMap, TileType } from "./types.ts";

interface ExplorerState {
  tileMap: TileMap;
  currentTile: TileType;
  destinationTile: TileType;
  destinationTileVisited: boolean;
  queuedTiles: TileType[];
}

export { Explorer };

const Explorer = (
  tileMap: TileMap,
) => {
  const state = {
    tileMap,
    currentTile: tileMap.endTile,
    destinationTile: tileMap.startTile,
    destinationTileVisited: false,
    queuedTiles: [tileMap.endTile],
  };

  return {
    ...shortestPathToDestinationFinder(state),
  };
};

const shortestPathToDestinationFinder = (state: ExplorerState) => ({
  findShortestPathToDestination: () => {
    while (!state.destinationTileVisited) {
      survey(state);
    }
    return state.destinationTile.getFewestSteps();
  },
});

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
  });
};

const getAdjacentTiles = (state: ExplorerState) => {
  const allTiles = state.tileMap.allTiles;
  const x = state.currentTile.getCoordinates().x;
  const y = state.currentTile.getCoordinates().y;

  const adjacentCoordinates = [[x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]];
  const adjacentTiles: TileType[] = [];

  adjacentCoordinates.forEach(([x, y]) => {
    if (x >= 0 && y >= 0 && x < allTiles[0].length && y < allTiles.length) {
      adjacentTiles.push(allTiles[y][x]);
    }
  });
  return adjacentTiles;
};
