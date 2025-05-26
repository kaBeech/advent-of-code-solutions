module Spec (getFewestTokens) where

import Types (Spec)

getFewestTokens :: Spec -> Integer
getFewestTokens (aX, aY, bX, bY, pX, pY)
  | numA `mod` denom == 0 && numB `mod` denom == 0 = 3 * a + b
  | otherwise = 0
  where
    numA = abs (pX * bY - pY * bX)
    numB = abs (pX * aY - pY * aX)
    denom = abs (aX * bY - aY * bX)
    a = numA `div` denom
    b = numB `div` denom
