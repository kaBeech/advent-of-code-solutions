{-# OPTIONS_GHC -Wno-unrecognised-pragmas #-}

{-# HLINT ignore "Use map with tuple-section" #-}
module Day09.Part2 (solvePart2) where

import Data.List (find, sort, sortBy)
import Data.Ord (Down (..), comparing)
import Data.Text (Text, lines)
import Safe
import Util.Coordinates (XYCoordinates)
import Util.Text (toXY)
import qualified Util.Tuple as Tuple
import Prelude hiding (lines)

-- A rectangle is represented as (area, cornerTile1, cornerTile2)
type Rectangle = (Int, XYCoordinates, XYCoordinates)

solvePart2 :: Text -> String
solvePart2 input = show $ biggestArea $ map toXY $ lines input

biggestArea :: [XYCoordinates] -> Int
biggestArea redTiles = areaOf biggestValidRectangle
  where
    biggestValidRectangle =
      find
        (valid sortedRedTiles (border redTiles))
        (biggestRectangles sortedRedTiles)
    sortedRedTiles = sort redTiles

areaOf :: Maybe Rectangle -> Int
areaOf Nothing = 0
areaOf (Just (area, _, _)) = area

biggestRectangles :: [XYCoordinates] -> [Rectangle]
biggestRectangles redTiles = sortBy (comparing Down) (allRectangles redTiles)

allRectangles :: [XYCoordinates] -> [Rectangle]
allRectangles redTiles =
  [ (rectangleArea corner1 corner2, corner1, corner2)
    | corner1 <- redTiles,
      corner2 <- redTiles,
      corner1 > corner2
  ]

rectangleArea :: XYCoordinates -> XYCoordinates -> Int
rectangleArea (x1, y1) (x2, y2) = sideLength x1 x2 * sideLength y1 y2

sideLength :: Int -> Int -> Int
sideLength scalar1 scalar2 = abs (scalar1 - scalar2) + 1

valid ::
  [XYCoordinates] ->
  [XYCoordinates] ->
  Rectangle ->
  Bool
valid redTiles borderTiles rectangle =
  not
    ( redTiles `inside` rectangle
        || borderTiles `inside` rectangle
    )

inside :: [XYCoordinates] -> Rectangle -> Bool
inside tiles (_, (x1, y1), (x2, y2)) =
  or
    [ True
      | (x', y') <- tiles,
        x' > min x1 x2,
        y' > min y1 y2,
        y' < max y1 y2,
        x' < max x1 x2
    ]

border :: [XYCoordinates] -> [XYCoordinates]
border redTiles = sort $ drop 1 $ paintBorder [] (redTiles ++ [at redTiles 0])

paintBorder :: [XYCoordinates] -> [XYCoordinates] -> [XYCoordinates]
paintBorder allPainted [] = allPainted
paintBorder [] (firstTile : unpainted) = paintBorder [firstTile] unpainted
paintBorder allPainted@(lastPainted@(x0, y0) : painted) ((x1, y1) : unpainted)
  | x0 == x1 && y0 > y1 =
      paintBorder
        (zip (repeat x0) [minY .. maxY] ++ painted)
        unpainted
  | x0 == x1 && y0 <= y1 =
      paintBorder
        (reverse (zip (repeat x0) [minY .. maxY]) ++ painted)
        unpainted
  | y0 == y1 && x0 > x1 =
      paintBorder
        (zip [minX .. maxX] (repeat y0) ++ painted)
        unpainted
  | y0 == y1 && x0 <= x1 =
      paintBorder
        (reverse (zip [minX .. maxX] (repeat y0)) ++ painted)
        unpainted
  | otherwise =
      error $
        "Tiles not aligned! "
          ++ show lastPainted
          ++ " and "
          ++ show (x1, y1)
          ++ "\nPainted: "
          ++ show allPainted
  where
    (minX, maxX) = Tuple.sort (x0, x1)
    (minY, maxY) = Tuple.sort (y0, y1)
