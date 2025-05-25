module Main (main) where

import Control.Monad (unless)
import SolvePart1 (solvePart1)
import SolvePart2 (solvePart2)
import System.Exit

main :: IO ()
main = do
  input1 <- readFile "data/test_input_1.dat"
  input2 <- readFile "data/test_input_2.dat"
  input3 <- readFile "data/test_input_3.dat"
  res1 <- test solvePart1 1 input1 "140"
  res2 <- test solvePart1 2 input2 "772"
  res3 <- test solvePart1 3 input3 "1930"
  res4 <- test solvePart2 4 input1 "2"
  let allPassed = and [res1, res2, res3, res4]
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
