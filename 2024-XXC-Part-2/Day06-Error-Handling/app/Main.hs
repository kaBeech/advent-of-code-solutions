module Main where

import Solve (solvePart1)

main :: IO ()
main = do
  -- input <- readFile "challenge_input.dat"
  input <- readFile "test_input.dat"
  putStrLn ("Part 1: How many distinct positions will the guard visit before leaving the mapped area? Answer: " ++ show (solvePart1 input))
