module Day09.Part1 (solvePart1) where

import Data.Text (Text, lines)
import Util.Coordinates (XYCoordinates)
import Util.Text (toXY)
import Prelude hiding (lines)

solvePart1 :: Text -> String
solvePart1 input = show $ biggestRectangleArea $ map toXY $ lines input

biggestRectangleArea :: [XYCoordinates] -> Int
biggestRectangleArea redTiles =
  maximum
    [rectangleArea scalar1 scalar2 | scalar1 <- redTiles, scalar2 <- redTiles]

rectangleArea :: XYCoordinates -> XYCoordinates -> Int
rectangleArea (x1, y1) (x2, y2) = sideLength x1 x2 * sideLength y1 y2

sideLength :: Int -> Int -> Int
sideLength scalar1 scalar2 = abs (scalar1 - scalar2) + 1
