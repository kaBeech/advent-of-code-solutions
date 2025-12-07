module Day07.Part1 (solvePart1) where

import Data.List (elemIndices, intersect, union, (\\))
import Data.Text (Text, unpack)
import Safe

solvePart1 :: Text -> String
solvePart1 input = show $ countSplits 0 [tachyonColumn] remainingLines
  where
    (tachyonColumn, remainingLines) = tachyonBeamEntry $ lines $ unpack input

tachyonBeamEntry :: [String] -> (Int, [String])
tachyonBeamEntry [] = error "Manifold empty!"
tachyonBeamEntry (firstLine : remainingLines) =
  (elemIndexJust 'S' firstLine, remainingLines)

countSplits :: Int -> [Int] -> [String] -> Int
countSplits totalSplits _ [] = totalSplits
countSplits totalSplits tachyonColumns (thisLine : remainingLines) =
  countSplits (totalSplits + length splittersHit) tachyonColumns' remainingLines
  where
    splitterIndices = elemIndices '^' thisLine
    splittersHit = splitterIndices `intersect` tachyonColumns
    remainingTachyonColumns = tachyonColumns \\ splittersHit
    tachyonColumnsAdded = foldl union [] (map splitTachyonBeam splittersHit)
    tachyonColumns' = remainingTachyonColumns `union` tachyonColumnsAdded

splitTachyonBeam :: Int -> [Int]
splitTachyonBeam n = [pred n, succ n]
