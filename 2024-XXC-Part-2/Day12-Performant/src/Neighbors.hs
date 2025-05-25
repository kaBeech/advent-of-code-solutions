module Neighbors (getNeighbors, matchPlant, isAdjacent) where

import Types (GardenFlatMap, Tile)

getNeighbors :: GardenFlatMap -> Tile -> [Tile]
getNeighbors gardenMap tile = filter (isAdjacent tile) gardenMap

isAdjacent :: Tile -> Tile -> Bool
isAdjacent (_, (x, y), _) (_, (x', y'), _) = abs (x - x') + abs (y - y') == 1

matchPlant :: Tile -> Tile -> Bool
matchPlant (plant, _, _) (plant', _, _) = plant' == plant
