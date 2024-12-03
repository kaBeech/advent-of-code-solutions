module Main where

import Parse (parseInput)

main :: IO ()
main = do
  input <- readFile "test_input.dat" -- Change to "challenge_input.dat"
  let parsed = parseInput input
  putStrLn "Part 1: The number of safe reports is:"
  print parsed
