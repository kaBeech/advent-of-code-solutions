module Types where

type XYCoord = (Int, Int)

-- | Whether path loops when leaving in this direction: (Right, Down, Left, Up)
type LoopRecord = ([Bool], [Bool], [Bool], [Bool])

-- | [[(Empty, Visited, Paths taken out of this tile, Loop Record Coordinates)]]
type AreaMap = [[(Bool, Bool, [Int], LoopRecord, XYCoord)]]

-- | (Number of places to put an obstruction that would create a loop,
--    Current position, Current direction, Area Map)
type Simulation = (Int, XYCoord, Int, AreaMap)
