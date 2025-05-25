module SolvePart1 (solvePart1) where

import Blink (blink)
import Parse (parseInput)

solvePart1 :: String -> String
solvePart1 input = result
  where
    result = show $ length stones'
    stones' = iterate blink stones !! 25
    stones = parseInput input
