module Solve where

import Exec (dayString, execDay, validDays)
import System.CPUTime (getCPUTime)
import Text.Printf (printf)

solveAll :: IO ()
solveAll = mapM_ (time . solveDay) validDays

solveDay :: Int -> IO ()
solveDay n = do
  input <- readFile $ "data/Day" ++ dayString n ++ "/challenge_input.dat"
  prompt1 <- readFile $ "data/Day" ++ dayString n ++ "/prompt1.txt"
  prompt2 <- readFile $ "data/Day" ++ dayString n ++ "/prompt2.txt"
  let (resultPart1, resultPart2) = execDay n input
  putStrLn $ "==================================\n"
  putStrLn $ "Solving Day " ++ dayString n ++ "!\n"
  putStrLn $ "Part 1: " ++ prompt1
  putStrLn $ "Solution: " ++ resultPart1 ++ "\n"
  putStrLn $ "Part 2: " ++ prompt2
  putStrLn $ "Solution: " ++ resultPart2 ++ "\n"

time :: IO t -> IO t
time f = do
  start <- getCPUTime
  result <- f
  end <- getCPUTime
  let diff = fromIntegral (end - start) / (10 ^ (12 :: Integer))
  printf "Computation time: %0.3f sec\n\n" (diff :: Double)
  return result
