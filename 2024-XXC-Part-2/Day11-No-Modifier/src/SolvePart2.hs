module SolvePart2 (solvePart2) where

import Blink (blink)
import Parse (parseInput)

solvePart2 :: String -> String
solvePart2 input = show result
  where
    result = blink 75 stones
    stones = parseInput input
