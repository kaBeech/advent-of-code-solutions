module Loop (countLoopOpps) where

import Simulation (runSimulation)
import Types (Simulation, Tile)

countLoopOpps :: [Tile] -> Simulation -> Int
countLoopOpps = acc 0
  where
    acc :: Int -> [Tile] -> Simulation -> Int
    acc count [] _ = count
    acc count ((_, _, _, (x, y)) : tiles) sim@(_, startPos, _, areaMap) =
      let _tileToBlock@(_, visited, _, _) = areaMap !! y !! x
          blockedTile = (False, False, [], (x, y))
          areaMap' = take y areaMap ++ [take x (areaMap !! y) ++ [blockedTile] ++ drop (x + 1) (areaMap !! y)] ++ drop (y + 1) areaMap
          isStartingTile = visited
          sim' = (False, startPos, 3, areaMap')
          (simulationLoops, _, _, _) = runSimulation sim'
          count' = if not isStartingTile && simulationLoops then count + 1 else count
          countIsNonNegative = count >= 0
          valid = countIsNonNegative
       in if valid then acc count' tiles sim else error "See above errors"
