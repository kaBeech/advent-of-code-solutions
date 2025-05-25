module Main (main) where

import Control.Monad (unless)
import Solve (solvePart1, solvePart2)
import System.Exit

main :: IO ()
main = do
  input1 <- readFile "data/test_input_1.dat"
  input2 <- readFile "data/test_input_2.dat"
  input3 <- readFile "data/test_input_3.dat"
  input4 <- readFile "data/test_input_4.dat"
  input5 <- readFile "data/test_input_5.dat"
  res1 <- test solvePart1 1 input1 "140"
  res2 <- test solvePart1 2 input2 "772"
  res3 <- test solvePart1 3 input3 "1930"
  res4 <- test solvePart2 4 input1 "80"
  res5 <- test solvePart2 5 input2 "436"
  res6 <- test solvePart2 6 input4 "236"
  res7 <- test solvePart2 7 input5 "368"
  res8 <- test solvePart2 8 input3 "1206"
  let allPassed = and [res1, res2, res3, res4, res5, res6, res7, res8]
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
