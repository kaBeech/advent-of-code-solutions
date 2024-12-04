module Main where

import Solve (solvePart1, solvePart2)

main :: IO ()
main = do
  -- input <- readFile "challenge_input.dat"
  input <- readFile "test_input.dat"
  putStrLn ("Part 1: \"XMAS\" appears this many times: " ++ show (solvePart1 input))
  putStrLn ("Part 2: \"MAS\" appears in an \"X\" shape this many times: " ++ show (solvePart2 input))
