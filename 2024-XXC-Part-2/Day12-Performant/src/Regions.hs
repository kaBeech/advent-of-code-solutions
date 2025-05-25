module Regions (getRegions) where

import Data.List (groupBy, partition, sort)
import Neighbors (isAdjacentToAny)
import Types (GardenFlatMap, Region, Tile)

getRegions :: GardenFlatMap -> [Region]
getRegions gardenMap = concatMap (defineRegions []) tilesByPlant
  where
    tilesByPlant = groupBy plantsEqual gardenMapSorted
    plantsEqual (plant, _) (plant', _) = plant == plant'
    gardenMapSorted = sort gardenMap

defineRegions :: [Region] -> [Tile] -> [Region]
defineRegions regions [] = regions
defineRegions regions _unpainted@(tile : rest) =
  defineRegions (region : regions) unpainted'
  where
    (region, unpainted') = paintRegion ([], [tile], rest)

paintRegion :: (Region, [Tile], [Tile]) -> (Region, [Tile])
paintRegion (region, currentBatch, unpainted)
  | null neighbors =
      (region ++ currentBatch, unpainted)
  | otherwise =
      paintRegion (region ++ currentBatch, neighbors, unpainted')
  where
    (neighbors, unpainted') = partition (isAdjacentToAny currentBatch) unpainted
