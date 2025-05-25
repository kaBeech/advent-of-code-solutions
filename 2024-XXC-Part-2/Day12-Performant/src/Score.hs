module Score (scoreRegion) where

import Neighbors (getNeighbors)
import Types (GardenFlatMap)

scoreRegion :: GardenFlatMap -> Int
scoreRegion gardenMap = area * perimeter
  where
    (area, perimeter) = getDimensions 0 0 gardenMap gardenMap

getDimensions :: Int -> Int -> GardenFlatMap -> GardenFlatMap -> (Int, Int)
getDimensions area perimeter [] _ = (area, perimeter)
getDimensions area perimeter (tile : rest) gardenMap =
  getDimensions (area + 1) (perimeter + borders) rest gardenMap
  where
    borders = 4 - length (getNeighbors gardenMap tile)
