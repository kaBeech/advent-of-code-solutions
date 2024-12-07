module Main where

import Solve (solve)

main :: IO ()
main = do
  -- input <- readFile "challenge_input.dat"
  input <- readFile "test_input.dat"
  let (solution1, solution2) = solve input
  putStrLn ("Part 1: How many distinct positions will the guard visit before leaving the mapped area? Answer: " ++ show solution1)
  putStrLn ("Part 2: How many different positions could you choose for this obstruction? Answer: " ++ show solution2)
