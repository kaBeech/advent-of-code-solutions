module Safe
  ( isSafe,
    isSemiSafe,
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

-- | Same as isSafe but returns True if the list would be safe if one element
--   were removed.

-- | ==== __Examples__
--  >>> isSemiSafe [1, 3, 2, 4, 5]
--  True
--
--  >>> isSemiSafe [8, 6, 4, 4, 1]
--  True
--
--  >>> isSemiSafe [1, 2, 7, 8, 9]
--  False
--
--  >>> isSemiSafe [9, 7, 6, 2, 1]
--  False
isSemiSafe :: [Int] -> Bool
isSemiSafe [] = True
isSemiSafe [_] = True
isSemiSafe [_, _] = True
isSemiSafe [x, y, z] = isSafe [x, y] || isSafe [y, z] || isSafe [x, z]
isSemiSafe (w : x : y : z : xs) = 
          (isSafe [w, x, y, z]
              && isSemiSafe (x : y : z : xs))
          || isSafe (x : y : z : xs)
          || isSafe (w : y : z : xs)
          || isSafe (w : x : z : xs)
          || isSafe (w : x : y : xs)
