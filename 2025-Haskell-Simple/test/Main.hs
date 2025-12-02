module Main (main) where

import Exec (isDayNumber, testAll, testDay)
import Safe
import System.Environment (getArgs)

main :: IO ()
main = do
  args <- getArgs
  if null args
    then testAll
    else
      if isDayNumber $ read $ at args 0
        then testDay $ read $ at args 0
        else
          error $
            "Argument unrecognized. Please enter the number of a Day (1 to 12), or call without arguments for all Days. Got: "
              ++ show (at args 0)
