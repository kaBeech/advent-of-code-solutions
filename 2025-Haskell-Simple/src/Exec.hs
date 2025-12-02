module Exec (isDayNumber, solveAll, solveDay, testAll, testDay) where

import Data.Text (pack)
import qualified Day1.Part1 as Day1

validDays :: [Int]
validDays = [1 .. 1]

isDayNumber :: Int -> Bool
isDayNumber n = n `elem` validDays

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

execDay :: Int -> String -> (String, String)
execDay n input = case n of
  1 -> (Day1.solvePart1 $ pack input, "Day 1 Part 2 not yet implemented")
  2 -> ("Day 2 Part 1 not yet implemented", "Day 2 Part 2 not yet implemented")
  3 -> ("Day 3 Part 1 not yet implemented", "Day 3 Part 2 not yet implemented")
  4 -> ("Day 4 Part 1 not yet implemented", "Day 4 Part 2 not yet implemented")
  5 -> ("Day 5 Part 1 not yet implemented", "Day 5 Part 2 not yet implemented")
  6 -> ("Day 6 Part 1 not yet implemented", "Day 6 Part 2 not yet implemented")
  7 -> ("Day 7 Part 1 not yet implemented", "Day 7 Part 2 not yet implemented")
  8 -> ("Day 8 Part 1 not yet implemented", "Day 8 Part 2 not yet implemented")
  9 -> ("Day 9 Part 1 not yet implemented", "Day 9 Part 2 not yet implemented")
  10 -> ("Day 10 Part 1 not yet implemented", "Day 10 Part 2 not yet implemented")
  11 -> ("Day 11 Part 1 not yet implemented", "Day 11 Part 2 not yet implemented")
  12 -> ("Day 12 Part 1 not yet implemented", "Day 12 Part 2 not yet implemented")
  _ -> error $ "Expected Day between 1 and 12; got: " ++ show n

testAll :: IO ()
testAll = mapM_ testDay validDays

testDay :: Int -> IO ()
testDay n = do
  input <- readFile $ "data/Day" ++ show n ++ "/test_input.dat"
  solutionPart1 <- readFile $ "data/Day" ++ show n ++ "/test_solution_1.txt"
  solutionPart2 <- readFile $ "data/Day" ++ show n ++ "/test_solution_2.txt"
  let (resultPart1, resultPart2) = execDay n input
  putStrLn $ "Testing Day " ++ show n ++ "!"
  putStrLn " Part 1..."
  putStrLn $
    testSolution
      resultPart1
      ( init solutionPart1 -- init to remove trailing newline
      )
  putStrLn "Part 2..."
  putStrLn $ testSolution resultPart2 (init solutionPart2)

testSolution :: String -> String -> String
testSolution actual expected
  | expected == actual = "Test passes!"
  | otherwise =
      error $
        "Test fails!"
          ++ "\nExpected: "
          ++ expected
          ++ "\nActual: "
          ++ actual
