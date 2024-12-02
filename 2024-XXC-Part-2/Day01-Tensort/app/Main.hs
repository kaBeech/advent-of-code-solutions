module Main where

import ParseInput (parseInput)

main :: IO ()
main = do
  putStrLn "The total distance between our lists is:"
  input <- readFile "test_input.dat"
  let (listL, listR) = parseInput input
  print listL
  print listR
