module Main where

import Parse (parseInput)
import Safe (isSafe)

main :: IO ()
main = do
  input <- readFile "challenge_input.dat" -- Change to "challenge_input.dat"
  let parsed = parseInput input
  let safeReports = filter isSafe parsed
  putStrLn "Part 1: The number of safe reports is:"
  print $ length safeReports
