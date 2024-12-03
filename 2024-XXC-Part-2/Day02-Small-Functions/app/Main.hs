module Main where

main :: IO ()
main = do
  input <- readFile "test_input.dat" -- Change to "challenge_input.dat"
  putStrLn "Part 1: The number of safe reports is:"
  print input
