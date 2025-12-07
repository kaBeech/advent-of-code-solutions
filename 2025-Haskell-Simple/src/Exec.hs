module Exec (dayString, execDay, isValidDay, validDays) where

import Data.Text (pack)
import qualified Day01.Part1
import qualified Day01.Part2
import qualified Day02.Part1
import qualified Day02.Part2
import qualified Day03.Part1
import qualified Day03.Part2
import qualified Day04.Part1
import qualified Day04.Part2
import qualified Day05.Part1
import qualified Day05.Part2
import qualified Day06.Part1
import qualified Day06.Part2

execDay :: Int -> String -> (String, String)
execDay n input = case n of
  1 ->
    (Day01.Part1.solvePart1 $ pack input, Day01.Part2.solvePart2 $ pack input)
  2 ->
    (Day02.Part1.solvePart1 $ pack input, Day02.Part2.solvePart2 $ pack input)
  3 ->
    (Day03.Part1.solvePart1 $ pack input, Day03.Part2.solvePart2 $ pack input)
  4 ->
    (Day04.Part1.solvePart1 $ pack input, Day04.Part2.solvePart2 $ pack input)
  5 ->
    (Day05.Part1.solvePart1 $ pack input, Day05.Part2.solvePart2 $ pack input)
  6 ->
    (Day06.Part1.solvePart1 $ pack input, Day06.Part2.solvePart2 $ pack input)
  7 ->
    ("Day 7 Part 1 not yet implemented", "Day 7 Part 2 not yet implemented")
  8 ->
    ("Day 8 Part 1 not yet implemented", "Day 8 Part 2 not yet implemented")
  9 ->
    ("Day 9 Part 1 not yet implemented", "Day 9 Part 2 not yet implemented")
  10 ->
    ("Day 10 Part 1 not yet implemented", "Day 10 Part 2 not yet implemented")
  11 ->
    ("Day 11 Part 1 not yet implemented", "Day 11 Part 2 not yet implemented")
  12 ->
    ("Day 12 Part 1 not yet implemented", "Day 12 Part 2 not yet implemented")
  _ -> error $ "Expected Day between 1 and 12; got: " ++ show n

dayString :: Int -> String
dayString n
  | not $ isValidDay n =
      error $
        "Invalid Day. Expected one of: "
          ++ show validDays
          ++ "; got: "
          ++ show n
  | n < 10 = '0' : show n
  | otherwise = show n

isValidDay :: Int -> Bool
isValidDay n = n `elem` validDays

validDays :: [Int]
validDays = [1 .. 6]
