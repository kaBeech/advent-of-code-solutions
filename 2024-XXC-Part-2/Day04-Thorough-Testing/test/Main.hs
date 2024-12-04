module Main (main) where

import Test.SolveSpec (testSolve)

main :: IO ()
main = do
  input <- readFile "test_input.dat"
  let solvePasses = testSolve input
   in if and [solvePasses] then putStrLn "All tests passed! Make sure to run DocTest as well!" else putStrLn "Some tests failed!"
