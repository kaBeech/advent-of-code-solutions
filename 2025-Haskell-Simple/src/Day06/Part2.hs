module Day06.Part2 (solvePart2) where

import Data.Char (isSpace)
import Data.List (transpose)
import Data.Text (Text, unpack)

solvePart2 :: Text -> String
solvePart2 input =
  show $ sum $ map solve $ equations
  where
    equations =
      parseEquations [] $ filter (not . null) $ transpose $ lines $ unpack input

parseEquations :: [[String]] -> [String] -> [[String]]
parseEquations equations [] = equations
parseEquations equations (firstLine : remainingLines) =
  parseEquations ((firstLine : firstEquation) : equations) (drop 1 rest)
  where
    (firstEquation, rest) = break (all isSpace) remainingLines

solve :: [String] -> Int
solve [] = error $ "Empty equation given to solve!"
solve (firstLine : rest) = case last firstLine of
  '+' -> sum $ map read $ init firstLine : rest
  '*' -> product $ map read $ init firstLine : rest
  _ -> error $ "Unexpected operator for firstLine; got: " ++ firstLine
