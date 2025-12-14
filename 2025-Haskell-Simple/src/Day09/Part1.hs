module Day09.Part1 (solvePart1) where

import Data.Text (Text, lines)
import Util.Coordinates (XYCoordinates)
import Util.Text (toXY)
import Prelude hiding (lines)

solvePart1 :: Text -> String
solvePart1 input = show res
  where
    res = maximum lc
    lc = [area a b | a <- redTiles, b <- redTiles]
    redTiles = map toXY $ lines input

area :: XYCoordinates -> XYCoordinates -> Int
area (x1, y1) (x2, y2) = sideLength x1 x2 * sideLength y1 y2

sideLength :: Int -> Int -> Int
sideLength a b = abs (a - b) + 1
