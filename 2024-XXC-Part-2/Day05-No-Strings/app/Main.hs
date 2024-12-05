module Main where

import Solve (solvePart1, solvePart2)

main :: IO ()
main = do
  -- input <- readFile "challenge_input.dat"
  input <- readFile "test_input.dat"
  putStrLn ("Part 1: What do you get if you add up the middle page number from those correctly-ordered updates? " ++ show (solvePart1 input))
  putStrLn ("Part 2: What do you get if you add up the middle page numbers after correctly ordering just the incorrectly ordered updates? " ++ show (solvePart2 input))
