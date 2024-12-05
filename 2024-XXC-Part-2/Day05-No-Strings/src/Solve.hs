module Solve (solvePart1) where

import Parse (parseInput)
import Types (Rule, Update)

solvePart1 :: String -> String -> Int
solvePart1 inputRules inputUpdates =
  let (rules, updates) = parseInput inputRules inputUpdates
   in getArea rules updates

getArea :: [Rule] -> [Update] -> Int
getArea rules updates =
  let xWidth = length (head rules)
      yHeight = length updates
      area = xWidth * yHeight
   in area
