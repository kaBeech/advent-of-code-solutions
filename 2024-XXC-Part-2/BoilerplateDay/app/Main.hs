module Main where

import Solve (solvePart1)

main :: IO ()
main = do
  -- input <- readFile "challenge_input.dat"
  input <- readFile "test_input.dat"
  putStrLn ("Part 1: What is the answer for Part 1? It is: " ++ show (solvePart1 input))
