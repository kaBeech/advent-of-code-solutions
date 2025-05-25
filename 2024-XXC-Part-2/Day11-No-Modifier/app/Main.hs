module Main where

import SolvePart1 (solvePart1)
import SolvePart2 (solvePart2)

main :: IO ()
main = do
  input <- readFile "data/challenge_input.dat"
  putStrLn "Part 1: How many stones will you have after blinking 25 times?"
  putStrLn $ solvePart1 input
  putStrLn "Part 2: How many stones would you have after blinking a total of 75 times?"
  putStrLn $ solvePart2 input
