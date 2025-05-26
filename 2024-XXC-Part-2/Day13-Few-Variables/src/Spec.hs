module Spec (getFewestTokens) where

import Types (Spec (Spec))

getFewestTokens :: Spec -> Int
getFewestTokens (Spec (aX, aY) (bX, bY) (pX, pY))
  | null possibleCombos = 0
  | otherwise = minimum $ map (\(a, b) -> (3 * a) + b) possibleCombos
  where
    possibleCombos =
      [ (a, b)
        | a <- [1 .. 100],
          b <- [1 .. 100],
          a * aX + b * bX == pX,
          a * aY + b * bY == pY
      ]
