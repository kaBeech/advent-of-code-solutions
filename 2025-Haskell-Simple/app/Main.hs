module Main where

import Exec (isValidDay)
import Safe
import Solve (solveAll, solveDay)
import System.Environment (getArgs)

-- | Call without arguments (i.e. `cabal run`) to show all Days' solutions.
--
--   Call with the Day's number (e.g. `cabal run exes -- 1` for Day 1) to show
--   just that Day's solutions
main :: IO ()
main = do
  args <- getArgs
  if null args
    then solveAll
    else
      if isValidDay $ read $ at args 0
        then solveDay $ read $ at args 0
        else
          error $
            "Argument unrecognized. Please enter the number of a Day (1 to 12), or call without arguments for all Days. Got: "
              ++ show (at args 0)
