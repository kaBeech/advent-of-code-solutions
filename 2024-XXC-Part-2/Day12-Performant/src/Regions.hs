module Regions (getRegions, scoreRegion) where

import Neighbors (getNeighbors, isAdjacent, matchPlant)
import Types (GardenFlatMap, Region, Tile)

getRegions :: GardenFlatMap -> [Region]
getRegions gardenMap = getRegions' gardenMap []

getRegions' :: GardenFlatMap -> [Region] -> [Region]
getRegions' [] regions = regions
getRegions' (tile : rest) regions = getRegions' gardenMap' (region : regions)
  where
    gardenMap' = filter notInRegion rest
    notInRegion t = not ((`elem` region) t)
    region = getRegion rest tile

getRegion :: GardenFlatMap -> Tile -> Region
getRegion gardenMap tile = tile : filter (partOfRegion gardenMap tile) gardenMap

directlyEligible :: Tile -> Tile -> Bool
directlyEligible tile0 tile1 = isAdjacent tile0 tile1 && matchPlant tile0 tile1

partOfRegion :: GardenFlatMap -> Tile -> Tile -> Bool
partOfRegion gardenMap tile0 tile1 = directlyEligible tile0 tile1 || any (partOfRegion gardenMap tile1) (getNeighbors gardenMap tile1)

scoreRegion :: Region -> Int
scoreRegion region = totalPerimeter * totalArea
  where
    totalPerimeter = sum $ map (\(_, _, perimeter) -> perimeter) region
    totalArea = length region
