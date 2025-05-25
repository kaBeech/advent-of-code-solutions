module SolvePart1 (solvePart1) where

import Parse (parseInput)

solvePart1 :: String -> String
solvePart1 input = concat $ iterate blink stones !! 25
  where
    stones = parseInput input
