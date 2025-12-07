module Util.Bounds (isInBounds) where

isInBounds :: (Ord a) => a -> (a, a) -> Bool
isInBounds n (lowerBound, upperBound) = n >= lowerBound && n <= upperBound
