module Main where

import Solve (solvePart1, solvePart2)

main :: IO ()
main = do
  input <- readFile "data/challenge_input.dat"
  putStrLn "Part 1: What is the total price of fencing all regions on your map?"
  putStrLn $ solvePart1 input
  putStrLn "Part 2: What is the new total price of fencing all regions on your map?"
  putStrLn $ solvePart2 input
