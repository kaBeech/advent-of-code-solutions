module AddPerimeters (addPerimeters) where

import GetNeighbors (getNeighbors)
import Types (GardenFlatMap, Tile)

addPerimeters :: GardenFlatMap -> GardenFlatMap
addPerimeters gardenMap = map (addPerimeters' gardenMap) gardenMap

addPerimeters' :: GardenFlatMap -> Tile -> Tile
addPerimeters' gardenMap tile@(plant, (x, y), score) = (plant, (x, y), borders)
  where
    borders = length $ filter (not matchPlant plant) neighbors
    neighbors = getNeighbors gardenMap (x, y)
