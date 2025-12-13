module Day04.Part1 (solvePart1) where

import Data.Text (Text)
import Math.Geometry.Grid (neighbours)
import Math.Geometry.GridMap (GridMap (keys), (!))
import qualified Math.Geometry.GridMap as GridMap
import Util.Coordinates (XYCoordinates)
import Util.Text (toTileMap)
import Util.Tile (TileMap)

solvePart1 :: Text -> String
solvePart1 input =
  show $ length $ filter (isAccessible tileMap) (keys paperRolls)
  where
    tileMap = toTileMap input
    paperRolls = GridMap.filter ('@' ==) tileMap

isAccessible :: TileMap -> XYCoordinates -> Bool
isAccessible tileMap coords =
  length neighborsWithPaperRolls < 4
  where
    neighborsWithPaperRolls =
      filter (hasPaperRoll tileMap) (neighbours tileMap coords)

hasPaperRoll :: TileMap -> XYCoordinates -> Bool
hasPaperRoll tileMap coords = tileMap ! coords == '@'
