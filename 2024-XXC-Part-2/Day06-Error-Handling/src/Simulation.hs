module Simulation (runSimulation) where

import Types (AreaMap, LoopRecord, Simulation, Tile, XYCoord)

runSimulation :: Simulation -> Simulation
runSimulation sim =
  let (loopOppCount, currentPos, prevDir, areaMap) = sim
      simFinished = not (isInBounds currentPos areaMap)
      nextDir = findSafeStep currentPos prevDir 0 areaMap
      (loopMap, addToCount) = checkLoopOpp currentPos nextDir areaMap
      areaMap' = recordVisit currentPos nextDir areaMap loopMap
      nextPos = step currentPos nextDir
      loopOppCount' = loopOppCount + addToCount
   in if simFinished
        then sim
        else runSimulation (loopOppCount', nextPos, nextDir, areaMap')

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
recordVisit :: XYCoord -> Int -> AreaMap -> AreaMap -> AreaMap
recordVisit (x, y) direction areaMap loopMap =
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
      areaMap'' = updateLoopRecords areaMap' (getLoopUpdates areaMap' loopMap)
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
        else areaMap''

-- | Takes two area maps and returns a list of tiles that have been visited
--   in the second map but not in the first.
getLoopUpdates :: AreaMap -> AreaMap -> [Tile]
getLoopUpdates areaMap loopMap =
  let loopMap' = concat loopMap
      areaMap' = concat areaMap
   in filter
        ( \(_, visited, _, _, _) ->
            visited
              && not
                ( any
                    ( \(_, visited', _, _, coords) ->
                        visited' && coords == coords
                    )
                    areaMap'
                )
        )
        loopMap'

-- | Updates loop records for tiles in the area map.
updateLoopRecords :: AreaMap -> [Tile] -> AreaMap
updateLoopRecords = foldl update
  where
    update :: AreaMap -> Tile -> AreaMap
    update areaMap (_, _, _, loopRecord', (x, y)) =
      let tile = areaMap !! y !! x
          (empty, visited, paths, loopRecord, _) = tile
          loopRecord'' = updateLoopRecord loopRecord loopRecord'
          areaMap' =
            take y areaMap
              ++ [ take x (areaMap !! y)
                     ++ [(empty, visited, paths, loopRecord'', (x, y))]
                     ++ drop (x + 1) (areaMap !! y)
                 ]
              ++ drop (y + 1) areaMap
       in areaMap'

updateLoopRecord :: LoopRecord -> LoopRecord -> LoopRecord
updateLoopRecord lrOld lrNew =
  let (old0, old1, old2, old3) = lrOld
      (new0, new1, new2, new3) = lrNew
      update old new = if null old then new else old
   in (update old0 new0, update old1 new1, update old2 new2, update old3 new3)

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
