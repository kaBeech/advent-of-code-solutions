module Gradual (isGradual) where

-- | Takes a list of integers and returns True if the difference between
--   adjacent integers is at most 3. Returns False otherwise.

--   ==== __Examples__
--   >>> isGradual [1, 2, 5, 4, 7]
--   True
--
--   >>> isGradual [1, 2, 3, 4, 8]
--   False
--
--   >>> isGradual []
--   True
--
--   >>> isGradual [1]
--   True
isGradual :: [Int] -> Bool
isGradual [] = True
isGradual [_] = True
isGradual (x : y : xs) = abs (x - y) < 4 && isGradual (y : xs)
