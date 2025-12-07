module Day05.Part2 (solvePart2) where

import Data.Text (Text, lines, pack, splitOn)
import Safe
import Util.Bounds (collate, size)
import Util.Text (toBounds)
import Prelude hiding (lines)

solvePart2 :: Text -> String
solvePart2 input = show $ sum $ map size freshRanges
  where
    inputParagraphs = splitOn (pack "\n\n") input
    freshRanges = collate $ map toBounds $ lines $ at inputParagraphs 0
