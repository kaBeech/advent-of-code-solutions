module Perimeters (addPerimeters) where

import Neighbors (getNeighbors, matchPlant)
import Types (GardenFlatMap, Tile)

addPerimeters :: GardenFlatMap -> GardenFlatMap
addPerimeters gardenMap = map (addPerimeters' gardenMap) gardenMap

addPerimeters' :: GardenFlatMap -> Tile -> Tile
addPerimeters' gardenMap tile@(plant, (x, y), _) = (plant, (x, y), borders)
  where
    borders = length $ filter notMatchPlant neighbors
    notMatchPlant neighbor = not (matchPlant tile neighbor)
    neighbors = getNeighbors gardenMap tile
