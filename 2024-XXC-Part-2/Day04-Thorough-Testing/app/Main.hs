module Main where

import Solve (solvePart1)

main :: IO ()
main = do
  -- input <- read "challenge_input.dat"
  input <- readFile "test_input.dat"
  putStrLn ("Part 1: \"XMAS\" appears this many times: " ++ show (solvePart1 input))
