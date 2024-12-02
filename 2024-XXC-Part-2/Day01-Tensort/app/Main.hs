module Main where

import Data.Tensort (tensort)
import Diffs (getDiffs)
import ParseInput (parseInput)
import Similarity (getSimilarityScore)

main :: IO ()
main = do
  input <- readFile "test_input.dat" -- Change to "challenge_input.dat"
  let (listL, listR) = parseInput input
  let sortedL = tensort listL
  let sortedR = tensort listR
  let diffs = getDiffs sortedL sortedR
  putStrLn "Part 1: The total distance between our lists is:"
  print $ sum diffs
  let similarityScore = getSimilarityScore sortedL sortedR 0
  putStrLn "Part 2: The similarity score for our lists is:"
  print similarityScore
