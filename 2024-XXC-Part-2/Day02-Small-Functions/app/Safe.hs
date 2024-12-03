module Safe
  ( isSafe,
  )
where

import Continuous (isContinuous)
import Gradual (isGradual)

-- | Takes a list of integers and returns True if 1) the integers are in ascending
--   or descending order, 2) no integer is repeated, and 3) the difference
--   between adjacent integers is at most 3. Returns False otherwise.

-- | ==== __Examples__
--   >>> isSafe [1, 4, 5, 7, 8]
--   True
--
--   >>> isSafe [9, 7, 5, 4, 1]
--   True
--
--   >>> isSafe [1, 4, 4, 7, 8]
--   False
--
--   >>> isSafe [1, 4, 5, 7, 6]
--   False
isSafe :: [Int] -> Bool
isSafe xs = isGradual xs && isContinuous xs
