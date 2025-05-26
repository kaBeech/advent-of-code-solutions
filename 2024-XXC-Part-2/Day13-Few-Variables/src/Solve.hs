module Solve (solvePart1, solvePart2) where

import Parse (parseInput)
import Spec (getFewestTokens, getFewestTokensV2)

solvePart1 :: String -> String
solvePart1 inputString =
  show $
    sum $
      map getFewestTokensV2 $
        parseInput 0 inputString

solvePart2 :: String -> String
solvePart2 inputString =
  show $
    sum $
      map getFewestTokensV2 $
        parseInput 10000000000000 inputString
