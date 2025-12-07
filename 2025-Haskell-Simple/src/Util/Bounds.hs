module Util.Bounds (collate, size, overlap, isInBounds, merge) where

import Data.Graph (Bounds)
import Data.List (sort)

isInBounds :: Int -> Bounds -> Bool
isInBounds n (lowerBound, upperBound) = n >= lowerBound && n <= upperBound

overlap :: Bounds -> Bounds -> Bool
overlap bounds1@(lower1, _) bounds2@(lower2, _) =
  lower1 `isInBounds` bounds2
    || lower2 `isInBounds` bounds1

collate :: [Bounds] -> [Bounds]
collate bounds = collate' $ sort bounds

collate' :: [Bounds] -> [Bounds]
collate' (bounds1@(_, upper1) : bounds2@(lower2, _) : rest)
  | bounds1 > bounds2 = collatedBounds
  | upper1 >= lower2 = collate (merge bounds1 bounds2 : rest)
  | otherwise = collate (bounds2 : rest) ++ [bounds1]
  where
    -- All collated bounds, in ascending order
    collatedBounds = (bounds2 : rest) ++ [bounds1]
collate' bounds = bounds

merge :: Bounds -> Bounds -> Bounds
merge (lower1, upper1) (lower2, upper2) =
  (min lower1 lower2, max upper1 upper2)

size :: Bounds -> Int
size (lower, upper) = upper - lower + 1
