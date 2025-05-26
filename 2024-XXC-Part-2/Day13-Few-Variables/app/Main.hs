module Main where

import Solve (solvePart1, solvePart2)

main :: IO ()
main = do
  input <- readFile "data/challenge_input.dat"
  putStrLn "Part 1: What is the sum of the scores of all trailheads on your topographic map?"
  putStrLn $ solvePart1 input
  putStrLn "Part 2: TBA"
  putStrLn $ solvePart2 input
