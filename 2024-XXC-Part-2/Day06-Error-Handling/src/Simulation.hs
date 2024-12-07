module Simulation (runSimulation) where

import Types (AreaMap, Simulation, XYCoord)

-- | Takes a Simulation and returns the final Simulation after the guard has
--   either left the area or entered a loop. When returning the final
--   Simulation, the guard's path is recorded as visited tiles in the AreaMap
--   and whether or not a loop was entered is recorded as the Simulation's
--   first element.

-- | ==== __Examples__
--   >>> runSimulation (False, (1, 1), 3, [[(True, False, [], (0, 0)), (False, False, [], (1, 0)), (True, False, [], (2, 0))], [(True, False, [], (0, 1)), (True, True, [], (1, 1)), (True, False, [], (2, 1))], [(False, False, [], (0, 2)), (True, False, [], (1, 2)), (False, False, [], (2, 2))]])
--   (False,(3,1),0,[[(True,False,[],(0,0)),(False,False,[],(1,0)),(True,False,[],(2,0))],[(True,False,[],(0,1)),(True,True,[0],(1,1)),(True,True,[0],(2,1))],[(False,False,[],(0,2)),(True,False,[],(1,2)),(False,False,[],(2,2))]])
runSimulation :: Simulation -> Simulation
runSimulation sim =
  let (_, currentPos@(x, y), prevDir, areaMap) = sim
      (_, _, pathsAlreadyTaken, _) = areaMap !! y !! x
      guardLeft = not (isInBounds currentPos areaMap)
      guardLoops = nextDir `elem` pathsAlreadyTaken
      nextDir = findSafeStep currentPos prevDir 0 areaMap
      areaMap' = recordVisit currentPos nextDir areaMap
      nextPos = step currentPos nextDir
   in if guardLeft
        then sim
        else
          if guardLoops
            then (True, currentPos, prevDir, areaMap)
            else runSimulation (False, nextPos, nextDir, areaMap')

isInBounds :: XYCoord -> AreaMap -> Bool
isInBounds (x, y) areaMap =
  let maxX = length (head areaMap) - 1
      maxY = length areaMap - 1
   in x >= 0 && x <= maxX && y >= 0 && y <= maxY

-- | Takes a position, a direction, and an area map and returns an updated
--  area map with the position marked as visited and the direction added to
--  the list of paths already taken.

-- | ==== __Examples__
--   >>> recordVisit (0, 0) 3 [[(True, False, [], (0,0))]]
--   [[(True,True,[3],(0,0))]]
--
--   >>> recordVisit (0, 0) 3 [[(True, True, [], (0,0))]]
--   [[(True,True,[3],(0,0))]]
--
--   >>> recordVisit (0, 0) 3 [[(True, True, [0], (0,0))]]
--   [[(True,True,[3,0],(0,0))]]
--
--   >>> recordVisit (0, 0) 3 [[(True, True, [1], (0,0))]]
--   [[(True,True,[3,1],(0,0))]]
recordVisit :: XYCoord -> Int -> AreaMap -> AreaMap
recordVisit (x, y) direction areaMap =
  let tile = areaMap !! y !! x
      (empty, _, paths, coords) = tile
      paths' = if direction `elem` paths then paths else direction : paths
      areaMap' =
        take y areaMap
          ++ [ take x (areaMap !! y)
                 ++ [(empty, True, paths', coords)]
                 ++ drop (x + 1) (areaMap !! y)
             ]
          ++ drop (y + 1) areaMap
   in if not empty
        then
          error
            ( "Cannot visit a non-empty tile. Got position ("
                ++ show x
                ++ ", "
                ++ show y
                ++ ") in AreaMap: "
                ++ show areaMap
            )
        else areaMap'

findSafeStep :: XYCoord -> Int -> Int -> AreaMap -> Int
findSafeStep (x, y) currentDir turnsCount areaMap =
  let nextPos = step (x, y) currentDir
      stepIsSafe
        | not (isInBounds nextPos areaMap) = True
        | isEmpty nextPos areaMap = True
        | otherwise = False
      allStepsTried =
        turnsCount > 3
          && error
            ( "No safe steps found after "
                ++ show turnsCount
                ++ " turns for position ("
                ++ show x
                ++ ", "
                ++ show y
                ++ ") in AreaMap: "
                ++ show areaMap
            )
      validDir = validateDir currentDir
   in if not allStepsTried && validDir && stepIsSafe
        then currentDir
        else findSafeStep (x, y) (turn currentDir) (turnsCount + 1) areaMap

turn :: Int -> Int
turn dir = if validateDir dir then (dir + 1) `mod` 4 else error "See above errors"

validateDir :: Int -> Bool
validateDir dir =
  (dir >= 0 && dir <= 3)
    || error ("Direction must be between 0 and 3. Got: " ++ show dir)

isEmpty :: XYCoord -> AreaMap -> Bool
isEmpty (x, y) areaMap =
  let tile = areaMap !! y !! x
      (empty, _, _, _) = tile
      validPos = isInBounds (x, y) areaMap || error "Position is out of bounds"
   in if validPos then empty else error "See above errors"

step :: XYCoord -> Int -> XYCoord
step (x, y) dir =
  case dir of
    0 -> (x + 1, y)
    1 -> (x, y + 1)
    2 -> (x - 1, y)
    3 -> (x, y - 1)
    _ -> error ("Direction must be between 0 and 3. Got: " ++ show dir)
