module SolvePart1 (solvePart1) where

import GetTrailheads (getTrailheads)
import Parse (parseInputFlat)
import ScoreTrailhead (scoreTrailhead)

solvePart1 :: String -> String
solvePart1 topographicalMapRaw = show totalScore
  where
    totalScore = sum scores
    scores = map (scoreTrailhead topoMap) trailheads
    trailheads = getTrailheads topoMap
    topoMap = parseInputFlat topographicalMapRaw
