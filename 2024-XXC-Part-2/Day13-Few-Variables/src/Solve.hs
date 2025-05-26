module Solve (solvePart1, solvePart2) where

import Parse (parseInput)
import Spec (getFewestTokens)

solvePart1 :: String -> String
solvePart1 inputString =
  show $
    sum $
      map getFewestTokens $
        parseInput inputString

solvePart2 :: String -> String
solvePart2 topographicalMap = topographicalMap
