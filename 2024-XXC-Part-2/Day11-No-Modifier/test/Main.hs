module Main (main) where

import Control.Monad (unless)
import SolvePart1 (solvePart1)
import SolvePart2 (solvePart2)
import System.Exit

main :: IO ()
main = do
  input1 <- readFile "data/test_input.dat"
  res1 <- test 1 input1 "55312"
  res2 <- test2 2 input1 "55312"
  let allPassed = res1 && res2
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
  let result = solvePart2 25 input
      passed = result == expected
  putStrLn $ "Result: \n" ++ result
  if passed
    then putStrLn "Success!"
    else putStrLn "---^---Failure!---^---"
  return passed
