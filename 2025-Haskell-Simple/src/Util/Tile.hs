module Util.Tile
  ( Tile,
    TileMap,
    coordinates,
    content,
    adjacent,
    toTileMap,
  )
where

import Data.Text (Text, chunksOf, lines, unpack)
import Util.Coordinates (XYCoordinates)
import Prelude hiding (lines)

type Tile =
  ( XYCoordinates,
    Text
  )

coordinates :: Tile -> XYCoordinates
coordinates = fst

content :: Tile -> Text
content = snd

type TileMap = [Tile]

toTileMap :: Text -> TileMap
toTileMap text = concatMap toColumns numberedRows
  where
    rows = reverse $ lines text
    numberedRows = zip [0 .. length rows - 1] rows

toColumns :: (Int, Text) -> [Tile]
toColumns (x, rowText) =
  zip
    ([(x, y) | y <- [0 .. length (unpack rowText) - 1]])
    (chunksOf 1 rowText)

adjacent :: Tile -> Tile -> Bool
adjacent firstTile secondTile =
  orthogonallyAdjacent firstTile secondTile
    || diagonallyAdjacent firstTile secondTile

horizontallyAdjacent :: Tile -> Tile -> Bool
horizontallyAdjacent firstTile secondTile =
  abs (x1 - x2) == 1 && y1 == y2
  where
    (x1, y1) = coordinates firstTile
    (x2, y2) = coordinates secondTile

verticallyAdjacent :: Tile -> Tile -> Bool
verticallyAdjacent firstTile secondTile =
  abs (y1 - y2) == 1 && x1 == x2
  where
    (x1, y1) = coordinates firstTile
    (x2, y2) = coordinates secondTile

orthogonallyAdjacent :: Tile -> Tile -> Bool
orthogonallyAdjacent firstTile secondTile =
  horizontallyAdjacent firstTile secondTile
    || verticallyAdjacent firstTile secondTile

diagonallyAdjacent :: Tile -> Tile -> Bool
diagonallyAdjacent firstTile secondTile =
  abs (x1 - x2) == 1 && abs (y1 - y2) == 1
  where
    (x1, y1) = coordinates firstTile
    (x2, y2) = coordinates secondTile
