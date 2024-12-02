module Main where

import Data.Tensort (tensort)
import GetDiffs (getDiffs)
import ParseInput (parseInput)

main :: IO ()
main = do
  putStrLn "The total distance between our lists is:"
  input <- readFile "test_input.dat" -- Change to "challenge_input.dat"
  let (listL, listR) = parseInput input
  let sortedL = tensort listL
  let sortedR = tensort listR
  let diffs = getDiffs sortedL sortedR
  print $ sum diffs
