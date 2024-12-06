module Solve (solvePart1) where

import Parse (parseInput)
import Simulation (runSimulation)

-- | Takes a string representation of an AreaMap (including newLines) and
--   returns the number of positions visited by the guard.

-- | ==== __Examples__
--   >>> solvePart1 ".#.\n.^.\n#.#"
--   2
solvePart1 :: String -> Int
solvePart1 input =
  let simulationInit = parseInput input
      simulationFinal = runSimulation simulationInit
      (visitedCount, _, _, _) = simulationFinal
   in visitedCount
