module Test where

import Exec (dayString, execDay, validDays)

testAll :: IO ()
testAll = mapM_ testDay validDays

testDay :: Int -> IO ()
testDay n = do
  input <- readFile $ "data/Day" ++ dayString n ++ "/test_input.dat"
  solutionPart1 <-
    readFile $ "data/Day" ++ dayString n ++ "/test_solution_1.txt"
  solutionPart2 <-
    readFile $ "data/Day" ++ dayString n ++ "/test_solution_2.txt"
  let (resultPart1, resultPart2) = execDay n input
  putStrLn $ "Testing Day " ++ dayString n ++ "!"
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
