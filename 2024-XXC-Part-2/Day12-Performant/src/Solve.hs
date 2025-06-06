module Solve (solvePart1, solvePart2) where

import Parse (parseInputFlat)
import Price (priceRegion, priceRegionDiscounted)
import Regions (getRegions)

solvePart1 :: String -> String
solvePart1 gardenMapRaw = show result
  where
    result = sum prices
    prices = map priceRegion regions
    regions = getRegions gardenMap
    gardenMap = parseInputFlat gardenMapRaw

solvePart2 :: String -> String
solvePart2 gardenMapRaw = show result
  where
    result = sum prices
    prices = map priceRegionDiscounted regions
    regions = getRegions gardenMap
    gardenMap = parseInputFlat gardenMapRaw
