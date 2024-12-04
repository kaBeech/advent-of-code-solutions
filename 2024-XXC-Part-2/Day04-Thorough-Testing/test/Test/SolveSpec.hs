module Test.SolveSpec (testSolve) where

import Solve (solvePart1, solvePart2)
import Test.TestCheck (check)

testSolve :: String -> Bool
testSolve input = do
  let t1 = testPart1Solution input
      t2 = testPart2Solution input
   in (t1 && t2)

testPart1Solution :: String -> Bool
testPart1Solution input = check "solvePart1" 18 (solvePart1 input) input

testPart2Solution :: String -> Bool
testPart2Solution input = check "solvePart2" 9 (solvePart2 input) input
