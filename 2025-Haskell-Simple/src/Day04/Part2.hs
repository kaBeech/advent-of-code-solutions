module Day04.Part2 (solvePart2) where

import Data.Text (Text)
import Math.Geometry.Grid (neighbours)
import Math.Geometry.GridMap (GridMap (keys))
import qualified Math.Geometry.GridMap as GridMap
import Util.Coordinates (XYCoordinates)
import Util.Text (toTileMap)
import Util.Tile (TileMap)

solvePart2 :: Text -> String
solvePart2 input =
  show $ length originalPaperRolls - length remainingPaperRolls
  where
    originalPaperRolls = GridMap.filter (== '@') $ toTileMap input
    remainingPaperRolls =
      removeRolls (keys originalPaperRolls) originalPaperRolls

hasLessThan4Neighbors :: TileMap -> XYCoordinates -> Bool
hasLessThan4Neighbors tileMap tile =
  length (neighbours tileMap tile) < 4

removeRolls :: [XYCoordinates] -> TileMap -> TileMap
removeRolls [] tileMap = tileMap
removeRolls (coords : coordsToCheck) tileMap
  | hasLessThan4Neighbors tileMap coords =
      removeRolls (adjacentTiles ++ dedup coordsToCheck) $
        GridMap.delete coords tileMap
  | otherwise = removeRolls coordsToCheck tileMap
  where
    adjacentTiles = neighbours tileMap coords
    dedup = filter (`notElem` adjacentTiles)
