module ScoreTrailhead (scoreTrailhead) where

import Data.Char (digitToInt)
import qualified Data.Set as Set
import Types (CharFlatMap, Tile)

scoreTrailhead :: CharFlatMap -> Tile -> Int
scoreTrailhead topoMap trailhead = length $ getReachablePeaks topoMap trailhead

getReachablePeaks :: CharFlatMap -> Tile -> [Tile]
getReachablePeaks _ tile@('9', _) = [tile]
getReachablePeaks topoMap tile =
  setNub $
    concatMap
      (getReachablePeaks topoMap)
      (getAccessibleTiles topoMap tile)

setNub :: (Ord a) => [a] -> [a]
setNub = Set.toList . Set.fromList

getAccessibleTiles :: CharFlatMap -> Tile -> [Tile]
getAccessibleTiles topoMap (c, (x, y)) = filter isAccessible adjacentTiles
  where
    adjacentTiles = filter isAdjacent topoMap
    isAdjacent (_, (x', y')) = abs (x' - x) + abs (y' - y) == 1
    isAccessible ('.', _) = False
    isAccessible (c', _) = digitToInt c + 1 == digitToInt c'
