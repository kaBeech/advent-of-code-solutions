module Solve (solvePart1) where

import Parse (parseInput)
import Rule (mkDict)
import Update (getOrderedUpdates, sumMiddlePages)

solvePart1 :: String -> String -> Int
solvePart1 inputRules inputUpdates =
  let (rules, updates) = parseInput inputRules inputUpdates
      rulesDict = mkDict rules
      orderedUpdates = getOrderedUpdates rulesDict updates
   in sumMiddlePages orderedUpdates
