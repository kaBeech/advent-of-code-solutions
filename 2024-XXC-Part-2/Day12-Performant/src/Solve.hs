module Solve (solvePart1, solvePart2) where

import Parse (parseInputFlat)
import Regions (getRegions)

solvePart1 :: String -> String
solvePart1 gardenMapRaw = show result
  where
    result = sum scores
    scores = map scoreRegion regions
    regions = getRegions gardenMap
    gardenMap = parseInputFlat gardenMapRaw

solvePart2 :: String -> String
solvePart2 gardenMapRaw = show result
  where
    result = gardenMap
    gardenMap = parseInputFlat gardenMapRaw
