module Main where

import Parse (parseInput)
import Safe (isSafe, isSemiSafe)

main :: IO ()
main = do
  input <- readFile "test_input.dat" -- Change to "challenge_input.dat"
  putStrLn ("Part 1: The number of safe reports is: " ++ show (length (filter isSafe (parseInput input))))
  putStrLn ("Part 2: The number of safe reports is: " ++ show (length (filter isSemiSafe (parseInput input))))
