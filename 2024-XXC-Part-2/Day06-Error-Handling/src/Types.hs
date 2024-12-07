module Types where

type XYCoord = (Int, Int)

-- | (Empty, Visited, Paths taken out of this tile, Loop Record, Coordinates)
type Tile = (Bool, Bool, [Int], XYCoord)

type AreaMap = [[Tile]]

-- | (Simulation loops, Current position, Current direction, Area Map)
type Simulation = (Bool, XYCoord, Int, AreaMap)
