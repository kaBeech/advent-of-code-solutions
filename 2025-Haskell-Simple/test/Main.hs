module Main (main) where

import Exec (isValidDay)
import Safe
import System.Environment (getArgs)
import Test (testAll, testDay)

-- | Call without arguments (i.e. `cabal run`) to test all Days' solutions.
--
--   Call with the Day's number (e.g. `cabal run exes -- 1` for Day 1) to test
--   just that Day's solutions
main :: IO ()
main = do
  args <- getArgs
  if null args
    then testAll
    else
      if isValidDay $ read $ at args 0
        then testDay $ read $ at args 0
        else
          error $
            "Argument unrecognized. Please enter the number of a Day (1 to 12), or call without arguments for all Days. Got: "
              ++ show (at args 0)
