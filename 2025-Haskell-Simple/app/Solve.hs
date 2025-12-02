module Solve where

import Exec (execDay, validDays)

solveAll :: IO ()
solveAll = mapM_ solveDay validDays

solveDay :: Int -> IO ()
solveDay n = do
  input <- readFile $ "data/Day" ++ show n ++ "/challenge_input.dat"
  prompt1 <- readFile $ "data/Day" ++ show n ++ "/prompt1.txt"
  prompt2 <- readFile $ "data/Day" ++ show n ++ "/prompt2.txt"
  let (resultPart1, resultPart2) = execDay n input
  putStrLn $ "Solving Day " ++ show n ++ "!"
  putStrLn $ "Part 1: " ++ prompt1
  putStrLn $ "Solution: " ++ resultPart1
  putStrLn $ "Part 2: " ++ prompt2
  putStrLn $ "Solution: " ++ resultPart2
