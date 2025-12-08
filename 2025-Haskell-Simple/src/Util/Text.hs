module Util.Text
  ( halfLength,
    firstHalf,
    secondHalf,
    toBounds,
    toInt,
    toInts,
    toRange,
    toText,
    toTileMap,
  )
where

import Data.Graph (Bounds)
import Data.List (transpose)
import Data.Text (Text, drop, length, lines, pack, show, splitOn, take, unpack)
import Math.Geometry.Grid.Octagonal (rectOctGrid)
import Math.Geometry.GridMap.Lazy (lazyGridMap)
import Util.Tile (TileMap)
import Util.Tuple (mapT, pairUp)
import Prelude hiding (drop, length, lines, take)
import qualified Prelude hiding (lines)

toBounds :: Text -> Bounds
toBounds text = case (pairUp . splitOn (pack "-")) text of
  [(lowerBound, upperBound)] -> (toInt lowerBound, toInt upperBound)
  _ -> error $ "Expected a single range in text; got: " ++ Prelude.show text

toInt :: Text -> Int
toInt text = read $ unpack text

toInts :: (Text, Text) -> (Int, Int)
toInts = mapT toInt

-- | ==== __Examples__
--   >>> toRange "11-22,95-115"
--   [(11,22),(95,115)]
toRange :: Text -> [Int]
toRange text = [lowerBound .. upperBound]
  where
    (lowerBound, upperBound) = toBounds text

-- | This is useful when we want to use both Prelude.show and Data.Text.show in
--   the same module without qualifying them
toText :: (Show a) => a -> Text
toText = Data.Text.show

toTileMap :: Text -> TileMap
toTileMap text = lazyGridMap grid (concat rows)
  where
    grid = rectOctGrid (Prelude.length rows) (Prelude.length columns)
    rows = map unpack $ lines text
    columns = transpose rows

halfLength :: Text -> Int
halfLength text = length text `div` 2

firstHalf :: Text -> Text
firstHalf text = take (halfLength text) text

secondHalf :: Text -> Text
secondHalf text = drop (halfLength text) text
