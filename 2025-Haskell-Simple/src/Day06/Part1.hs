module Day06.Part1 (solvePart1) where

import Data.List (transpose)
import Data.Text (Text, unpack)

solvePart1 :: Text -> String
solvePart1 input = show $ sum $ map solve equations
  where
    equations = transpose $ map words $ lines $ unpack input

solve :: [String] -> Int
solve equation = case last equation of
  "+" -> sum numbers
  "*" -> product numbers
  operator -> error $ "Unexpected operator for equation; got: " ++ operator
  where
    numbers = map read $ init equation
