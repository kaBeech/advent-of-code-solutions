module GetTrailheads (getTrailheads) where

import Types (CharMap, Tile, XYCoord)

getTrailheads :: CharMap -> [Tile]
getTrailheads = concatMap $ filter isTrailhead

isTrailhead :: (Char, XYCoord) -> Bool
isTrailhead (char, _) = char == '0'
