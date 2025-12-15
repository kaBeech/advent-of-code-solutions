module Day09.Part2 (solvePart2) where

import Data.List (sort, sortBy)
import Data.Ord (Down (..), comparing)
import Data.Text (Text, lines)
import Util.Coordinates (XYCoordinates)
import Util.Text (toXY)
import qualified Util.Tuple as Tuple
import Prelude hiding (lines)

solvePart2 :: Text -> String
solvePart2 input = show res
  where
    res = biggestValidRectangle
    biggestValidRectangle = head $ dropWhile (notAllTilesRedAndGreen redTiles borderTiles) $ sortBy (comparing Down) allRectangles
    allRectangles = [(area a b, a, b) | a <- redTiles, b <- redTiles, a > b]
    redTiles' = map toXY $ lines input
    redTiles = sort redTiles'
    borderTiles = sort $ drop 1 $ paintTiles [] (redTiles' ++ [head redTiles'])

notAllTilesRedAndGreen :: [XYCoordinates] -> [XYCoordinates] -> (Int, XYCoordinates, XYCoordinates) -> Bool
notAllTilesRedAndGreen redTiles borderTiles (_, _cornerTile1@(x1, y1), _cornerTile2@(x2, y2)) =
  redTilesInside || any borderTilesInsideParallelRedTiles parallelRedTiles || borderTilesInside
  where
    -- [minX, maxX] = sort [x1, x2]
    -- [minY, maxY] = sort [y1, y2]
    minX = min x1 x2
    maxX = max x1 x2
    minY = min y1 y2
    maxY = max y1 y2
    parallelRedTiles = [((x', y'), (x'', y'')) | a@(x', y') <- redTilesOnBorder, b@(x'', y'') <- redTilesOnBorder, a /= b, (x' == x'') || (y' == y'')]
    redTilesOnBorder = [(x', y') | (x', y') <- redTiles, ((x' == minX || x' == maxX) && y' > minY && y' < maxY) || ((y' == minY || y' == maxY) && x' > minX && x' < maxX)]
    borderTilesInside = or (take 1 [True | (x', y') <- borderTiles, x' > minX, y' > minY, y' < maxY, x' < maxX])
    redTilesInside = or (take 1 [True | (x', y') <- redTiles, x' > minX, y' > minY, y' < maxY, x' < maxX])
    borderTilesInsideParallelRedTiles ((x', y'), (x'', y'')) = if x' == x'' then or (take 1 [True | (x''', y''') <- borderTiles, x''' == x', y''' > min y' y'', y''' < max y' y'']) else or (take 1 [True | (x''', y''') <- borderTiles, y''' == y', x''' > min x' x'', x''' < max x' x''])

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
