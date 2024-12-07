module Solve (solve) where

import Loop (countLoopOpps)
import Parse (parseInput)
import Simulation (runSimulation)

-- | Takes a string representation of an AreaMap (including newLines) and
--   returns the number of positions visited by the guard.

-- | ==== __Examples__
--   >>> solve ".#.\n.^.\n#.#"
--   (2,0)
solve :: String -> (Int, Int)
solve input =
  let simulationInit = parseInput input
      simulationFinal = runSimulation simulationInit
      (_, _, _, areaMap) = simulationFinal
      visitedTiles = (filter (\(_, visited, _, _) -> visited) (concat areaMap))
      loopOppsCount = countLoopOpps visitedTiles simulationInit
   in (length visitedTiles, loopOppsCount)
