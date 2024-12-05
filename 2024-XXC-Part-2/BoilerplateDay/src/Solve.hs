module Solve (solvePart1) where

import Parse (parseInput)
import Types (CharMap)

-- | Takes a string representation of a CharMap (including newLines) and
--   returns the area of the map.

-- | ==== __Examples__
--   >>> solvePart1 "HEL\nLOW\nORL\nD!!"
--   12
--
--   >>> solvePart1 "XMAS\nMMMM\nAMAM\nSMMS"
--   16
solvePart1 :: String -> Int
solvePart1 input =
  let wordMap = parseInput input
   in getArea wordMap

getArea :: CharMap -> Int
getArea wordMap =
  let xWidth = length (head wordMap)
      yHeight = length wordMap
      area = xWidth * yHeight
   in area
