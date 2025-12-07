module Day05.Part1 (solvePart1) where

import Data.Text (Text, lines, pack, splitOn)
import Safe
import Types (Bounds, toBounds)
import Util.Bounds (isInBounds)
import Util.Text (toInt)
import Prelude hiding (lines)

solvePart1 :: Text -> String
solvePart1 input = show $ length $ filter (isFresh freshRanges) ingredients
  where
    freshRanges = map toBounds $ lines $ at (splitOn (pack "\n\n") input) 0
    ingredients = map toInt $ lines $ at (splitOn (pack "\n\n") input) 1

isFresh :: [Bounds] -> Int -> Bool
isFresh freshRanges ingredient = any (ingredient `isInBounds`) freshRanges
