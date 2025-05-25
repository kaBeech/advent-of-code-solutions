module Main (main) where

import Control.Monad (unless)
import SolvePart1 (solvePart1)
import SolvePart2 (solvePart2)
import System.Exit

main :: IO ()
main = do
  input1 <- readFile "data/test_input_1.dat"
  res1 <- test solvePart1 1 input1 "1"
  res2 <- test solvePart2 2 input1 "2"
  let allPassed = res1 && res2
  unless allPassed exitFailure

test :: (String -> String) -> Int -> String -> String -> IO Bool
test f n input expected = do
  putStrLn $ "Test Input " ++ show n ++ " should equal " ++ expected ++ "..."
  let result = f input
      passed = result == expected
  putStrLn $ "Result: \n" ++ result
  if passed
    then putStrLn "Success!"
    else putStrLn "---^---Failure!---^---"
  return passed
