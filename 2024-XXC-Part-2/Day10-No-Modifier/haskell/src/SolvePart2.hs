module SolvePart2 (solvePart2) where

import GetTrailheads (getTrailheads)
import Parse (parseInputFlat)
import ScoreTrailhead (getTrailheadRating)

solvePart2 :: String -> String
solvePart2 topographicalMapRaw = show totalScore
  where
    totalScore = sum scores
    scores = map (getTrailheadRating topoMap) trailheads
    trailheads = getTrailheads topoMap
    topoMap = parseInputFlat topographicalMapRaw
