module Test where

import Exec (execDay, validDays)

-- | Call without arguments (i.e. `cabal run`) to test all Days' solutions.
--
--   Call with the Day's number (e.g. `cabal run exes -- 1` for Day 1) to test
--   just that Day's solutions
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
