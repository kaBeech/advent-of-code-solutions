module Day07.Part2 (solvePart2) where

import Data.List (elemIndices)
import Data.Map (Map, elems, fromListWith, singleton, toList)
import Data.Text (Text, unpack)
import Safe

solvePart2 :: Text -> String
solvePart2 input = show $ countTimelines tachyonMap $ drop 1 manifold
  where
    manifold = lines $ unpack input
    tachyonEntryColumn = elemIndexJust 'S' $ at manifold 0
    tachyonMap = singleton tachyonEntryColumn 1

countTimelines :: Map Int Int -> [String] -> Int
countTimelines tachyonMap [] = sum $ elems tachyonMap
countTimelines tachyonMap (thisLine : remainingLines) =
  countTimelines tachyonMap' remainingLines
  where
    splitterIndices = elemIndices '^' thisLine
    splittersHit = filter (flip elem splitterIndices . fst) $ toList tachyonMap
    remainingTimelines =
      filter (flip notElem (map fst splittersHit) . fst) $ toList tachyonMap
    timelinesAdded = concatMap splitTimeline splittersHit
    tachyonMap' =
      fromListWith (+) $ remainingTimelines ++ timelinesAdded

splitTimeline :: (Int, Int) -> [(Int, Int)]
splitTimeline (k, v) = [(pred k, v), (succ k, v)]
