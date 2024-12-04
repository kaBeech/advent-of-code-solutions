module Solve (solvePart1) where

import Parse (parseInput)
import Search (countWords)

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
