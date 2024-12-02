module Similarity
  ( getSimilarityScore,
  )
where

-- | Takes two lists of integers and a current score and returns the current
--   score plus the similarity score of the two lists.

-- | ==== __Examples__
--  >>> getSimilarityScore [1, 2, 3] [1, 3, 5] 0
--  4
--
--  >>> getSimilarityScore [1,2,3,3,3,4] [3,3,3,4,5,9] 0
--  31
--
--  >>> getSimilarityScore [] [1,2,3,4,5] 0
--  0
getSimilarityScore :: [Int] -> [Int] -> Int -> Int
getSimilarityScore [] _ score = score
getSimilarityScore _ [] score = score
getSimilarityScore (x : xs) (y : ys) score = do
  if x > y
    then getSimilarityScore (x : xs) ys score
    else
      if x < y
        then getSimilarityScore xs (y : ys) score
        else getSimilarityScore xs (y : ys) (sumFirstIntDupes (y : ys) + score)

-- | Takes a list of integers and returns the sum of each occurrence of the
--   first integer in the list.

-- | ==== __Examples__
--   >>> sumFirstIntDupes [3, 3, 3, 4, 5, 5, 5, 5]
--   9
--
--   >>> sumFirstIntDupes [1, 2, 3, 4, 5]
--   1
--
--   >>> sumFirstIntDupes []
--   0
sumFirstIntDupes :: [Int] -> Int
sumFirstIntDupes [] = 0
sumFirstIntDupes (x : xs) = x * length (takeWhile (== x) (x : xs))
