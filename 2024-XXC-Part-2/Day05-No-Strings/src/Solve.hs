module Solve (solvePart1, solvePart2) where

import Parse (parseInput)
import Rule (mkDict)
import Update (getOrderedUpdates, getUnorderedUpdates, sortUpdate, sumMiddlePages)

solvePart1 :: [Char] -> Int
solvePart1 input =
  let (rules, updates) = parseInput input
      rulesDict = mkDict rules
      orderedUpdates = getOrderedUpdates rulesDict updates
   in sumMiddlePages orderedUpdates

solvePart2 :: [Char] -> Int
solvePart2 input =
  let (rules, updates) = parseInput input
      rulesDict = mkDict rules
      unorderedUpdates = getUnorderedUpdates rulesDict updates
      reorderedUpdates = map (sortUpdate rulesDict) unorderedUpdates
   in sumMiddlePages reorderedUpdates
