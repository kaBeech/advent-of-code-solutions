{-# LANGUAGE TupleSections #-}

module Day09.Part2 (solvePart2) where

import Data.List (sort, sortBy)
import Data.Ord (Down (..), comparing)
import Data.Text (Text, lines)
import Util.Coordinates (XYCoordinates, fromXY)
import Util.Text (toXY)
import qualified Util.Tuple as Tuple
import Prelude hiding (lines)

solvePart2 :: Text -> String
solvePart2 input = show res
  where
    -- res = take 1 $ sortBy (comparing Down) allRectangles
    res = biggestValidRectangle
    biggestValidRectangle = head $ dropWhile (notAllTilesRedAndGreen borderTiles) $ sortBy (comparing Down) allRectangles
    allRectangles = [(area a b, a, b) | a <- redTiles, b <- redTiles, a > b]
    redTiles = map toXY $ lines input
    borderTiles = drop 1 $ paintTiles [] (redTiles ++ [head redTiles])

notAllTilesRedAndGreen :: [XYCoordinates] -> (Int, XYCoordinates, XYCoordinates) -> Bool
notAllTilesRedAndGreen borderTiles (_, _cornerTile1@(x1, y1), _cornerTile2@(x2, y2)) =
  borderTilesInside
  where
    -- [minX, maxX] = sort [x1, x2]
    -- [minY, maxY] = sort [y1, y2]
    minX = min x1 x2
    maxX = max x1 x2
    minY = min y1 y2
    maxY = max y1 y2
    sortedBorderTiles = sort borderTiles
    borderTilesInside = or (take 1 [True | (x', y') <- sortedBorderTiles, x' > minX, y' > minY, y' < maxY, x' < maxX])

area :: XYCoordinates -> XYCoordinates -> Int
area (x1, y1) (x2, y2) = sideLength x1 x2 * sideLength y1 y2

sideLength :: Int -> Int -> Int
sideLength a b = abs (a - b) + 1

paintTiles :: [XYCoordinates] -> [XYCoordinates] -> [XYCoordinates]
paintTiles painted [] = painted
paintTiles [] (tile : tiles) = paintTiles [tile] tiles
paintTiles painted@(lastPainted@(x0, y0) : rest) ((x1, y1) : ts)
  | x0 == x1 && y0 > y1 = paintTiles ((zip (repeat x0) ([minY .. maxY])) ++ rest) ts
  | x0 == x1 && y0 <= y1 = paintTiles (reverse (zip (repeat x0) ([minY .. maxY])) ++ rest) ts
  | y0 == y1 && x0 > x1 = paintTiles ((zip ([minX .. maxX]) (repeat y0)) ++ rest) ts
  | y0 == y1 && x0 <= x1 = paintTiles (reverse (zip ([minX .. maxX]) (repeat y0)) ++ rest) ts
  | otherwise =
      error $
        "Tiles not aligned! " ++ show lastPainted ++ " and " ++ show (x1, y1) ++ "\nPainted: " ++ show painted
  where
    (minX, maxX) = Tuple.sort (x0, x1)
    (minY, maxY) = Tuple.sort (y0, y1)
