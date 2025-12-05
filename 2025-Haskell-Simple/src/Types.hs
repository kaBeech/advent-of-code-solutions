{-# LANGUAGE DataKinds #-}

module Types where

import Data.Text (Text, chunksOf, lines, unpack)
import Prelude hiding (lines)

type Coordinates = [Int]

type XYCoordinates = (Int, Int)

toXY :: Coordinates -> XYCoordinates
toXY (x1 : y1 : _rest) = (x1, y1)
toXY coordinates =
  error $
    "Expecting a list of at least two coordinates; got: " ++ show coordinates

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
