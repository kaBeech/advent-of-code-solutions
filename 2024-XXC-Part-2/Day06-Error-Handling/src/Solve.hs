module Solve (solve) where

import Parse (parseInput)
import Simulation (runSimulation)

-- | Takes a string representation of an AreaMap (including newLines) and
--   returns the number of positions visited by the guard.

-- | ==== __Examples__
--   >>> solve ".#.\n.^.\n#.#"
--   2
solve :: String -> (Int, Int)
solve input =
  let simulationInit = parseInput input
      simulationFinal = runSimulation simulationInit
      (loopOppsCount, _, _, areaMap) = simulationFinal
      visitedCount = length (filter (\(_, visited, _, _, _) -> visited) (concat areaMap))
   in (visitedCount, loopOppsCount)
