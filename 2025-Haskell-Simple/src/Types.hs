{-# LANGUAGE DataKinds #-}

module Types where

import Data.Text (Text, chunksOf, lines, pack, splitOn, unpack)
import Util.Text (toInt)
import Util.Tuple (pairUp)
import Prelude hiding (lines)

type Coordinates = [Int]

type XYCoordinates = (Int, Int)

toXY :: Coordinates -> XYCoordinates
toXY (x : y : _rest) = (x, y)
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

type Range = [Int]

-- | ==== __Examples__
--   >>> toRange "11-22,95-115"
--   [(11,22),(95,115)]
toRange :: Text -> [Int]
toRange text = case (pairUp . splitOn (pack "-")) text of
  [(lowerBound, upperBound)] -> [toInt lowerBound .. toInt upperBound]
  _ -> error $ "Expected a single range in text; got: " ++ show text

type Bounds = (Int, Int)

toBounds :: Text -> (Int, Int)
toBounds text = case (pairUp . splitOn (pack "-")) text of
  [(lowerBound, upperBound)] -> (toInt lowerBound, toInt upperBound)
  _ -> error $ "Expected a single range in text; got: " ++ show text
