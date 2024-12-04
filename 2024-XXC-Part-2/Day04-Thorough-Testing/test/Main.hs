module Main (main) where

import Solve (solvePart1)
import Test.TestCheck (check)

main :: IO ()
main = do
  input <- readFile "test_input.dat"
  let t1 = testPart1Solution input
   in if t1 then putStrLn "All tests passed!" else putStrLn "Some tests failed!"

testPart1Solution :: String -> Bool
testPart1Solution input = check "solvePart1" 18 (solvePart1 input) input
