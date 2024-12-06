module Simulation (runSimulation) where

import Types (AreaMap, Simulation, XYCoord)

runSimulation :: Simulation -> Simulation
runSimulation sim =
  let (visitedCount, currentPos, currentDir, areaMap) = sim
      simFinished = not (isInBounds currentPos areaMap)
      (areaMap', newlyVisitedTiles) = visitTile currentPos areaMap
      visitedCount' = visitedCount + newlyVisitedTiles
      currentDir' = findSafeStep currentPos currentDir areaMap'
      currentPos' = step currentPos currentDir'
   in if simFinished
        then sim
        else runSimulation (visitedCount', currentPos', currentDir', areaMap')

isInBounds :: XYCoord -> AreaMap -> Bool
isInBounds (x, y) areaMap =
  let maxX = length (head areaMap) - 1
      maxY = length areaMap - 1
   in x >= 0 && x <= maxX && y >= 0 && y <= maxY
