module Continuous (isContinuous) where

-- | Takes a list of integers and returns True if 1) the integers are in
--   ascending or descending order, and 2) no integer is repeated. Returns
--   False otherwise.

-- | ==== __Examples__
--   >>> isContinuous [1, 2, 3, 4, 5]
--   True
--
--   >>> isContinuous [5, 4, 3, 2, 1]
--   True
--
--   >>> isContinuous [1, 2, 3, 3, 4]
--   False
--
--   >>> isContinuous [1, 2, 3, 5, 4]
--   False
--
--   >>> isContinuous []
--   True
--
--   >>> isContinuous [1]
--   True
--
--   >>> isContinuous [1, 2]
--   True
isContinuous :: [Int] -> Bool
isContinuous [] = True
isContinuous [_] = True
isContinuous [x, y] = x /= y
isContinuous (x : y : z : xs) = (y - x) * (z - y) > 0 && isContinuous (y : z : xs)
