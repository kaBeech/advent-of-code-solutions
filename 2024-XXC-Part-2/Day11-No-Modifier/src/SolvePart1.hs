module SolvePart1 (solvePart1) where

import Blink (blinkV2)
import Parse (parseInput)

solvePart1 :: String -> String
solvePart1 input = show result
  where
    result = blinkV2 25 stones
    stones = parseInput input
