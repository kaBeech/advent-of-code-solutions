module Price (priceRegion, priceRegionDiscounted) where

import Neighbors (getNeighbors)
import Types (Region, Tile)

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

priceRegionDiscounted :: Region -> Int
priceRegionDiscounted = priceRegion
