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
  input4 <- readFile "data/test_input_4.dat"
  input5 <- readFile "data/test_input_5.dat"
  input6 <- readFile "data/test_input_6.dat"
  input7 <- readFile "data/test_input_7.dat"
  input8 <- readFile "data/test_input_8.dat"
  res1 <- test 1 input1 "1"
  res2 <- test 2 input2 "2"
  res3 <- test 3 input3 "4"
  res4 <- test 4 input4 "3"
  res5 <- test 5 input5 "36"
  res6 <- test2 6 input6 "3"
  res7 <- test2 7 input7 "13"
  res8 <- test2 8 input8 "227"
  res9 <- test2 9 input5 "81"
  let allPassed =
        res1
          && res2
          && res3
          && res4
          && res5
          && res6
          && res7
          && res8
          && res9
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

test2 :: Int -> String -> String -> IO Bool
test2 n input expected = do
  putStrLn $ "Test Input " ++ show n ++ " should equal " ++ expected ++ "..."
  let result = solvePart2 input
      passed = result == expected
  putStrLn $ "Result: \n" ++ result
  if passed
    then putStrLn "Success!"
    else putStrLn "---^---Failure!---^---"
  return passed
