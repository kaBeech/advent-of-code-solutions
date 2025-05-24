module SolvePart1 (solvePart1) where

import GetTrailheads (getTrailheads)
import Parse (parseInput)

solvePart1 :: String -> String
solvePart1 topographicalMapRaw = show totalScore
  where
    totalScore = sum scores
    scores = map scoreTrailhead trailheads
    trailheads = getTrailheads topoMap
    topoMap = parseInput topographicalMapRaw
