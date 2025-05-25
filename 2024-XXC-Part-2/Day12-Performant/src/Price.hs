module Price (priceRegion, priceRegionDiscounted) where

import Neighbors (getNeighbors, getNeighborsAll)
import Types (Region, Tile, XYCoord)

priceRegion :: Region -> Int
priceRegion region = area * perimeter
  where
    (area, perimeter) = getDimensions 0 0 region region

getDimensions :: Int -> Int -> [Tile] -> Region -> (Int, Int)
getDimensions area perimeter [] _ = (area, perimeter)
getDimensions area perimeter (tile : rest) region =
  getDimensions (area + 1) (perimeter + borders) rest region
  where
    borders = 4 - length (getNeighbors region tile)

-- Polygons with straight edges have the same number of corners as sides, and
-- corners are easier to find than edges, so we use them instead to calculate
-- the price.
priceRegionDiscounted :: Region -> Int
priceRegionDiscounted [_] = 4
priceRegionDiscounted region = area * corners
  where
    area = length region
    corners = sum $ map (countCorners region) region

countCorners :: Region -> Tile -> Int
countCorners region tile@(_, (x, y)) =
  length $ filter (isCorner neighborsAll tile) diagonals
  where
    neighborsAll = getNeighborsAll region tile
    diagonals = [(x + i, y + j) | i <- [-1, 1], j <- [-1, 1]]

isCorner :: [Tile] -> Tile -> XYCoord -> Bool
isCorner neighborsAll (_, (x0, y0)) diagonal@(x1, y1) =
  someNotInRegion && orthogonalsMatch
  where
    someNotInRegion = not (diagonalInRegion && orthogonal0InRegion)
    orthogonalsMatch = orthogonal0InRegion == orthoganal1InRegion
    diagonalInRegion = inRegion neighborsAll diagonal
    orthogonal0InRegion = inRegion neighborsAll (x0, y1)
    orthoganal1InRegion = inRegion neighborsAll (x1, y0)
    inRegion tiles (x, y) = any (\(_, (x', y')) -> x' == x && y' == y) tiles
