module Main (main) where

import Solve (solvePart1)

main :: IO ()
main = do
  input <- readFile "test_input.dat"
  let t1 = testPart1Solution input
   in if t1 then putStrLn "All tests passed!" else putStrLn "Some tests failed!"

testPart1Solution :: String -> Bool
testPart1Solution input =
  let result = solvePart1 input
   in ( (result == 18)
          || error ("Testing solvePart1 failed: Expected 18, but got " ++ show result)
      )
