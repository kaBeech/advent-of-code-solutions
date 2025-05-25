module Neighbors
  ( getNeighbors,
    isAdjacentToAny,
    getNeighborsAll,
  )
where

import Types (GardenFlatMap, Tile)

getNeighbors :: GardenFlatMap -> Tile -> [Tile]
getNeighbors gardenMap tile = filter (isAdjacent tile) gardenMap

isAdjacent :: Tile -> Tile -> Bool
isAdjacent (_, (x, y)) (_, (x', y')) = abs (x - x') + abs (y - y') == 1

isAdjacentToAny :: [Tile] -> Tile -> Bool
isAdjacentToAny tiles tile = any (isAdjacent tile) tiles

getNeighborsAll :: GardenFlatMap -> Tile -> [Tile]
getNeighborsAll gardenMap tile = filter (isNeighbor tile) gardenMap

isNeighbor :: Tile -> Tile -> Bool
isNeighbor (_, (x, y)) (_, (x', y')) = abs (x - x') <= 1 && abs (y - y') <= 1
