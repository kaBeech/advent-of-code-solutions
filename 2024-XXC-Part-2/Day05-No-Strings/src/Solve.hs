module Solve (solvePart1) where

import Parse (parseInput)

solvePart1 :: String -> String -> Int
solvePart1 inputRules inputUpdates =
  let (rules, updates) = parseInput inputRules inputUpdates
      rulesTrie = mkTrie rules
      orderedUpdates = getOrderedUpdates rulesTrie updates
   in sumMiddlePages orderedUpdates
