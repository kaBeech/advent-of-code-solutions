module Util.Tile (tilesAdjacentTo) where

import Types (Tile, tileXY)

tilesAdjacentTo :: Tile -> [Tile] -> [Tile]
tilesAdjacentTo tile = filter (tilesAdjacent tile)

tilesAdjacent :: Tile -> Tile -> Bool
tilesAdjacent firstTile secondTile =
  tilesOrthogonallyAdjacent firstTile secondTile
    || tilesDiagonallyAdjacent firstTile secondTile

tilesHorizontallyAdjacent :: Tile -> Tile -> Bool
tilesHorizontallyAdjacent firstTile secondTile =
  abs (x1 - x2) == 1 && y1 == y2
  where
    (x1, y1) = tileXY firstTile
    (x2, y2) = tileXY secondTile

tilesVerticallyAdjacent :: Tile -> Tile -> Bool
tilesVerticallyAdjacent firstTile secondTile =
  abs (y1 - y2) == 1 && x1 == x2
  where
    (x1, y1) = tileXY firstTile
    (x2, y2) = tileXY secondTile

tilesOrthogonallyAdjacent :: Tile -> Tile -> Bool
tilesOrthogonallyAdjacent firstTile secondTile =
  tilesHorizontallyAdjacent firstTile secondTile
    || tilesVerticallyAdjacent firstTile secondTile

tilesDiagonallyAdjacent :: Tile -> Tile -> Bool
tilesDiagonallyAdjacent firstTile secondTile =
  abs (x1 - x2) == 1 && abs (y1 - y2) == 1
  where
    (x1, y1) = tileXY firstTile
    (x2, y2) = tileXY secondTile
