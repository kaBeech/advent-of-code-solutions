module Main where

import Data.Tensort (tensort)
import GetDiffs (getDiffs)
import ParseInput (parseInput)

main :: IO ()
main = do
  putStrLn "The total distance between our lists is:"
  input <- readFile "test_input.dat"
  let (listL, listR) = parseInput input
  let sortedL = tensort listL
  let sortedR = tensort listR
  print sortedL
  print sortedR
  let diffs = getDiffs sortedL sortedR
  print diffs
