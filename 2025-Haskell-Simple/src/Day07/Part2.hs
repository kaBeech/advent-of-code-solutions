module Day07.Part2 (solvePart2) where

import Data.List (elemIndices)
import Data.Map (Map, elems, fromListWith, singleton, toList)
import Data.Text (Text, unpack)
import Safe (elemIndexJust)

solvePart2 :: Text -> String
solvePart2 input = show $ countPaths tachyonMap remainingLines
  where
    (tachyonColumn, remainingLines) = tachyonBeamEntry $ lines $ unpack input
    tachyonMap = singleton tachyonColumn 1

tachyonBeamEntry :: [String] -> (Int, [String])
tachyonBeamEntry [] = error "Manifold empty!"
tachyonBeamEntry (firstLine : remainingLines) =
  (elemIndexJust 'S' firstLine, remainingLines)

countPaths :: Map Int Int -> [String] -> Int
countPaths tachyonMap [] = sum $ elems tachyonMap
countPaths tachyonMap (thisLine : remainingLines) =
  countPaths tachyonMap' remainingLines
  where
    splitterIndices = elemIndices '^' thisLine
    splittersHit = filter (flip elem splitterIndices . fst) $ toList tachyonMap
    remainingTachyonPaths =
      filter (flip notElem (map fst splittersHit) . fst) $ toList tachyonMap
    tachyonColumnsAdded = concatMap splitTachyonPath splittersHit
    tachyonMap' =
      fromListWith (+) $ remainingTachyonPaths ++ tachyonColumnsAdded

splitTachyonPath :: (Int, Int) -> [(Int, Int)]
splitTachyonPath (k, v) = [(pred k, v), (succ k, v)]
