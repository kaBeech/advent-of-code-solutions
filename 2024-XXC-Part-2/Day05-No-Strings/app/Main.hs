module Main where

import Solve (solvePart1)

main :: IO ()
main = do
  -- inputRules <- readFile "challenge_input_rules.dat"
  -- inputUpdates <- readFile "challenge_input_updates.dat"
  inputRules <- readFile "test_input_rules.dat"
  inputUpdates <- readFile "test_input_updates.dat"
  putStrLn ("Part 1: What do you get if you add up the middle page number from those correctly-ordered updates? " ++ show (solvePart1 inputRules inputUpdates))
