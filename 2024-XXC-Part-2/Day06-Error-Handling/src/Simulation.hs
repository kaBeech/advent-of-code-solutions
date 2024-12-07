module Simulation (runSimulation) where

import Types (AreaMap, Simulation, XYCoord)

runSimulation :: Simulation -> Simulation
runSimulation sim =
  let (visitedCount, currentPos, currentDir, areaMap) = sim
      simFinished = not (isInBounds currentPos areaMap)
      (newlyVisitedTiles, areaMap') = visitTile currentPos areaMap
      visitedCount' = visitedCount + newlyVisitedTiles
      currentDir' = findSafeStep currentPos currentDir 0 areaMap'
      currentPos' = step currentPos currentDir'
   in if simFinished
        then sim
        else runSimulation (visitedCount', currentPos', currentDir', areaMap')

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
      (empty, _, paths, loopRecord, coords) = tile
      paths' = if direction `elem` paths then paths else direction : paths
      areaMap' =
        take y areaMap
          ++ [ take x (areaMap !! y)
                 ++ [(empty, True, paths', loopRecord, coords)]
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
      stepIsSafe =
        not (isInBounds nextPos areaMap)
          || isEmpty nextPos areaMap
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
      (empty, _, _, _, _) = tile
   in empty

step :: XYCoord -> Int -> XYCoord
step (x, y) dir =
  case dir of
    0 -> (x + 1, y)
    1 -> (x, y + 1)
    2 -> (x - 1, y)
    3 -> (x, y - 1)
    _ -> error ("Direction must be between 0 and 3. Got: " ++ show dir)
