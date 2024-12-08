module Main where

import Solve (solve)

main :: IO ()
main = do
  input <- readFile "challenge_input.dat"
  -- input <- readFile "test_input.dat"
  putStrLn ("Part 1: What is their total calibration result? Answer: " ++ show (solve input))
