module SolvePart2 (solvePart2) where

import Blink (blinkV2)
import Parse (parseInput)

solvePart2 :: Int -> String -> String
solvePart2 n input = result
  where
    result = show $ length stones'
    stones' = blinkV2 n stones
    stones = parseInput input
