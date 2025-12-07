module Day05.Part1 (solvePart1) where

import Data.Graph (Bounds)
import Data.Text (Text, lines, pack, splitOn)
import Safe
import Util.Bounds (isInBounds)
import Util.Text (toInt, toBounds)
import Prelude hiding (lines)

solvePart1 :: Text -> String
solvePart1 input = show $ length $ filter (isFresh freshRanges) ingredients
  where
    inputParagraphs = splitOn (pack "\n\n") input
    freshRanges = map toBounds $ lines $ at inputParagraphs 0
    ingredients = map toInt $ lines $ at inputParagraphs 1

isFresh :: [Bounds] -> Int -> Bool
isFresh freshRanges ingredient = any (ingredient `isInBounds`) freshRanges
