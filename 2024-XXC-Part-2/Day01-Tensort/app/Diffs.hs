module Diffs
  ( getDiffs,
  )
where

-- | Takes two lists of integers and returns a list of integers that are the
--   absolute differences between the elements of the two lists.

-- | ==== __Examples__
--  >>> getDiffs [1, 2, 3] [1, 3, 5]
--  [0, 1, 2]
getDiffs :: [Int] -> [Int] -> [Int]
getDiffs = zipWith (\x y -> abs (x - y))
