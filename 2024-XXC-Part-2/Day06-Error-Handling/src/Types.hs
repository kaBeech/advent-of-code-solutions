module Types where

type XYCoord = (Int, Int)

-- | [[(Empty, Visited, Coordinates)]]
type AreaMap = [[(Bool, Bool, XYCoord)]]

-- | (Number of unique areas visited, Current position, Current direction, Area Map)
type Simulation = (Int, XYCoord, Int, AreaMap)
