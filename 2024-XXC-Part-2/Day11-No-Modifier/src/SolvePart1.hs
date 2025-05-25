module SolvePart1 (solvePart1) where

import Blink (blink)
import Parse (parseInput)

solvePart1 :: String -> String
solvePart1 input = show result
  where
    result = blink 25 stones
    stones = parseInput input
