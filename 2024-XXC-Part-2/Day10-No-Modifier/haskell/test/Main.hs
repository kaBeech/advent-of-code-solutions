module Main (main) where

import Control.Monad (unless)
import SolvePart1 (solvePart1)
import System.Exit

main :: IO ()
main = do
  input1 <- readFile "data/test_input_1.dat"
  input2 <- readFile "data/test_input_2.dat"
  input3 <- readFile "data/test_input_3.dat"
  input4 <- readFile "data/test_input_4.dat"
  input5 <- readFile "data/test_input_5.dat"
  res1 <- test 1 input1 "1"
  res2 <- test 2 input2 "2"
  res3 <- test 3 input3 "4"
  res4 <- test 4 input4 "3"
  res5 <- test 5 input5 "36"
  let allPassed = res1 && res2 && res3 && res4 && res5
  unless allPassed exitFailure

test :: Int -> String -> String -> IO Bool
test n input expected = do
  putStrLn $ "Test Input " ++ show n ++ " should equal " ++ expected ++ "..."
  let result = solvePart1 input
      passed = result == expected
  putStrLn $ "Result: \n" ++ result
  if passed
    then putStrLn "Success!"
    else putStrLn "---^---Failure!---^---"
  return passed
