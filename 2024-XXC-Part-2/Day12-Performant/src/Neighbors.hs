module Neighbors (getNeighbors, matchPlant) where

import Types (GardenFlatMap, Tile)

getNeighbors :: GardenFlatMap -> (Int, Int) -> [Tile]
getNeighbors gardenMap (x, y) = filter isNeighbor gardenMap
  where
    isNeighbor (_, (x', y'), _) = abs (x - x') + abs (y - y') == 1

matchPlant :: Char -> Tile -> Bool
matchPlant plant (plant', _, _) = plant' == plant
