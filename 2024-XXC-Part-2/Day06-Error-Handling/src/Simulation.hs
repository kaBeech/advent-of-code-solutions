module Simulation (runSimulation) where

import Types (AreaMap, Simulation, XYCoord)

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

-- | Takes a position and an area map and checks whether the position has
--   already been visited. If it has, it returns 0 and the original area map.
--   If it hasn't, it returns 1 and the area map with the position marked as
--   visited.

-- | ==== __Examples__
--   >>> recordVisit (0, 0) [[(True, False, [])]]
--   (1, [[(True, True, [])]])
--
--   >>> recordVisit (0, 0) [[(True, True, [])]]
--   (0, [[(True, True, [])]])
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
      invalidDir = currentDir < 0 || currentDir > 3 && error ("Direction must be between 0 and 3. Got: " ++ show currentDir)
   in if not allStepsTried && not invalidDir && stepIsSafe
        then currentDir
        else findSafeStep (x, y) (turn currentDir) (turnsCount + 1) areaMap

turn :: Int -> Int
turn dir = (dir + 1) `mod` 4

isEmpty :: XYCoord -> AreaMap -> Bool
isEmpty (x, y) areaMap =
  let tile = areaMap !! y !! x
      (empty, _, _, _) = tile
   in empty

step :: XYCoord -> Int -> XYCoord
step (x, y) dir =
  case dir of
    0 -> (x + 1, y)
    1 -> (x, y + 1)
    2 -> (x - 1, y)
    3 -> (x, y - 1)
    _ -> error ("Direction must be between 0 and 3. Got: " ++ show dir)
