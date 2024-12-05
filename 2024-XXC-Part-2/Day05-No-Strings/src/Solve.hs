module Solve (solvePart1) where

import Parse (parseInput)
import Rule (mkDict)
import Update (getOrderedUpdates, sumMiddlePages)

solvePart1 :: [Char] -> Int
solvePart1 input =
  let (rules, updates) = parseInput input
      rulesDict = mkDict rules
      orderedUpdates = getOrderedUpdates rulesDict updates
   in sumMiddlePages orderedUpdates
