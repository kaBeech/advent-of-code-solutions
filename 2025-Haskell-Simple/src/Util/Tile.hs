module Util.Tile
  ( Tile (..),
    TileMap,
    tilesAdjacent,
    tilesAdjacentTo,
    toTile,
    toTileMap,
  )
where

import Data.Text (Text, chunksOf, lines, unpack)
import Util.Coordinates (Coordinates, XYCoordinates, toXY)
import Prelude hiding (lines)

data Tile = Tile
  { tileContent :: Text,
    tileCoordinates :: Coordinates
  }
  deriving (Eq)

instance Ord Tile where
  (<=) firstTile secondTile =
    tileCoordinates firstTile <= tileCoordinates secondTile

toTile :: (Coordinates, Text) -> Tile
toTile (coordinates, text) =
  Tile {tileContent = text, tileCoordinates = coordinates}

tileXY :: Tile -> XYCoordinates
tileXY tile = toXY $ tileCoordinates tile

type TileMap = [Tile]

toTileMap :: Text -> TileMap
toTileMap text = concatMap toColumns numberedRows
  where
    rows = reverse $ lines text
    numberedRows = zip [0 .. length rows - 1] rows

toColumns :: (Int, Text) -> [Tile]
toColumns (x, rowText) =
  zipWith
    (curry toTile)
    ([[x, y] | y <- [0 .. length (unpack rowText) - 1]])
    (chunksOf 1 rowText)

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
