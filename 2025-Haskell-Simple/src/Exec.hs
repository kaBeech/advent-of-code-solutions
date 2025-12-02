module Exec (execDay, isValidDay, validDays) where

import Data.Text (pack)
import qualified Day1.Part1
import qualified Day1.Part2

execDay :: Int -> String -> (String, String)
execDay n input = case n of
  1 -> (Day1.Part1.solvePart1 $ pack input, Day1.Part2.solvePart2 $ pack input)
  2 -> ("Day 2 Part 1 not yet implemented", "Day 2 Part 2 not yet implemented")
  3 -> ("Day 3 Part 1 not yet implemented", "Day 3 Part 2 not yet implemented")
  4 -> ("Day 4 Part 1 not yet implemented", "Day 4 Part 2 not yet implemented")
  5 -> ("Day 5 Part 1 not yet implemented", "Day 5 Part 2 not yet implemented")
  6 -> ("Day 6 Part 1 not yet implemented", "Day 6 Part 2 not yet implemented")
  7 -> ("Day 7 Part 1 not yet implemented", "Day 7 Part 2 not yet implemented")
  8 -> ("Day 8 Part 1 not yet implemented", "Day 8 Part 2 not yet implemented")
  9 -> ("Day 9 Part 1 not yet implemented", "Day 9 Part 2 not yet implemented")
  10 -> ("Day 10 Part 1 not yet implemented", "Day 10 Part 2 not yet implemented")
  11 -> ("Day 11 Part 1 not yet implemented", "Day 11 Part 2 not yet implemented")
  12 -> ("Day 12 Part 1 not yet implemented", "Day 12 Part 2 not yet implemented")
  _ -> error $ "Expected Day between 1 and 12; got: " ++ show n

isValidDay :: Int -> Bool
isValidDay n = n `elem` validDays

validDays :: [Int]
validDays = [1 .. 1]
