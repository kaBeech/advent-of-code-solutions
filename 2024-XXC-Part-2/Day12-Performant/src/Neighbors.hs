module Neighbors (getNeighbors, isAdjacent, isAdjacentToAny) where

import Types (GardenFlatMap, Tile)

getNeighbors :: GardenFlatMap -> Tile -> [Tile]
getNeighbors gardenMap tile = filter (isAdjacent tile) gardenMap

isAdjacent :: Tile -> Tile -> Bool
isAdjacent (_, (x, y)) (_, (x', y')) = abs (x - x') + abs (y - y') == 1

isAdjacentToAny :: [Tile] -> Tile -> Bool
isAdjacentToAny tiles tile = any (isAdjacent tile) tiles
