module Day04.Part2 (solvePart2) where

import Data.List (intersect, (\\))
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
hasLessThan4Neighbors tileMap coords =
  length neighborsActual < 4
  where
    neighborsOnFullGrid = neighbours tileMap coords
    neighborsActual = neighborsOnFullGrid `intersect` keys tileMap

removeRolls :: [XYCoordinates] -> TileMap -> TileMap
removeRolls [] tileMap = tileMap
removeRolls (coords : coordsToCheck) tileMap
  | hasLessThan4Neighbors tileMap coords = removeRolls coordsToCheck' tileMap'
  | otherwise = removeRolls coordsToCheck tileMap
  where
    adjacentTiles = neighbours tileMap coords `intersect` keys tileMap
    coordsToCheck' = adjacentTiles ++ (coordsToCheck \\ adjacentTiles)
    tileMap' = GridMap.delete coords tileMap
