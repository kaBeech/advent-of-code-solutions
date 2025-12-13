module Day04.Part1 (solvePart1) where

import Data.List (intersect)
import Data.Text (Text)
import Math.Geometry.Grid (neighbours)
import Math.Geometry.GridMap (GridMap (keys))
import qualified Math.Geometry.GridMap as GridMap
import Util.Coordinates (XYCoordinates)
import Util.Text (toTileMap)
import Util.Tile (TileMap)

solvePart1 :: Text -> String
solvePart1 input =
  show $ length $ filter (hasLessThan4Neighbors paperRolls) (keys paperRolls)
  where
    paperRolls = GridMap.filter ('@' ==) (toTileMap input)

hasLessThan4Neighbors :: TileMap -> XYCoordinates -> Bool
hasLessThan4Neighbors tileMap coords =
  length neighborsActual < 4
  where
    neighborsOnFullGrid = neighbours tileMap coords
    neighborsActual = neighborsOnFullGrid `intersect` keys tileMap
