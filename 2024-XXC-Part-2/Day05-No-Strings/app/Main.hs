module Main where

import Solve (solvePart1)

main :: IO ()
main = do
  -- input <- readFile "challenge_input.dat"
  input <- readFile "test_input.dat"
  putStrLn ("Part 1: What do you get if you add up the middle page number from those correctly-ordered updates? " ++ show (solvePart1 input))
