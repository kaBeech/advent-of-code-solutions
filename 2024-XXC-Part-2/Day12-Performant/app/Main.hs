module Main where

import SolvePart1 (solvePart1)
import SolvePart2 (solvePart2)

main :: IO ()
main = do
  input <- readFile "data/challenge_input.dat"
  putStrLn "Part 1: What is the total price of fencing all regions on your map?"
  putStrLn $ solvePart1 input
  putStrLn "Part 2: TBA"
  putStrLn $ solvePart2 input
