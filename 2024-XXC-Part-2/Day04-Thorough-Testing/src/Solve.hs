module Solve (solvePart1, solvePart2) where

import Parse (parseInput)
import Search (countWords, countXWords)

-- | Takes a string representation of a WordMap (including newLines) and
--   returns the number of times the word "XMAS" appears in it, Word Search
--   style.

-- | ==== __Examples__
--   >>> solvePart1 "XMAS\nMMMM\nAMAM\nSMMS"
--   3
--
--   >>> solvePart1 "SMMS\nMAMA\nMMMM\nSAMX"
--   3
--
--   >>> solvePart1 "MMMMM\nMMMSX\nMMAMM\nMMAMM\nXSMMM"
--   2
--
--   >>> solvePart1 "XAMAASXMMASX"
--   0
--
--   >>> solvePart1 "MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX"
--   18
solvePart1 :: String -> Int
solvePart1 input =
  let wordMap = parseInput input
   in countWords "XMAS" wordMap

-- | Takes a string representation of a WordMap (including newLines) and
--   returns the number of times the word "MAS" appears in it in an "X" shape.

-- | ==== __Examples__
--   >>> solvePart2 "MXS\nXAX\nMXS"
--   1
--
--   >>> solvePart2 "XMAS\nMMMM\nAMAM\nSMMS"
--   0
solvePart2 :: String -> Int
solvePart2 input =
  let wordMap = parseInput input
   in countXWords "MAS" wordMap
