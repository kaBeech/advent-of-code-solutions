module Types where

import Data.Text (Text, chunksOf, lines, unpack)
import Prelude hiding (lines)

type Coordinates = [Int]

data Tile = Tile
  { tileContent :: Text,
    tileCoordinates :: Coordinates
  }
  deriving (Eq)

toTile :: Text -> Coordinates -> Tile
toTile text coordinates =
  Tile {tileContent = text, tileCoordinates = coordinates}

instance Ord Tile where
  (<=) firstTile secondTile =
    tileCoordinates firstTile <= tileCoordinates secondTile

type TileMap = [Tile]

toTileMap :: Text -> [(Coordinates, Text)]
toTileMap text = concatMap toColumns numberedRows
  where
    rows = reverse $ lines text
    numberedRows = zip [0 .. length rows - 1] rows

toColumns :: (Int, Text) -> [(Coordinates, Text)]
toColumns (x, rowText) =
  zip
    [[x, y] | y <- [0 .. length (unpack rowText) - 1]]
    (chunksOf 1 rowText)
