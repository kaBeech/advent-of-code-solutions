module GetTrailheads (getTrailheads) where

import Types (CharFlatMap, Tile, XYCoord)

getTrailheads :: CharFlatMap -> [Tile]
getTrailheads = filter isTrailhead

isTrailhead :: (Char, XYCoord) -> Bool
isTrailhead (char, _) = char == '0'
