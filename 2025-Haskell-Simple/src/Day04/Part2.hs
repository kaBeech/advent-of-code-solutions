module Day04.Part2 (solvePart2) where

import Data.List (intersect, (\\))
import Data.Text (Text)
import Math.Geometry.Grid (neighbours)
import Math.Geometry.GridMap (GridMap (keys, (!)))
import qualified Math.Geometry.GridMap as GridMap
import Util.Coordinates (XYCoordinates)
import Util.Text (toTileMap)
import Util.Tile (TileMap)

solvePart2 :: Text -> String
solvePart2 input =
  show $ length originalPaperRolls - length remainingPaperRolls
  where
    tileMap = toTileMap input
    originalPaperRolls = GridMap.filter (== '@') tileMap
    remainingPaperRolls =
      GridMap.filter (== '@') $ removeRolls (keys originalPaperRolls) tileMap

removeRolls :: [XYCoordinates] -> TileMap -> TileMap
removeRolls [] tileMap = tileMap
removeRolls (coords : coordsToCheck) tileMap
  | isAccessible tileMap coords = removeRolls coordsToCheck' tileMap'
  | otherwise = removeRolls coordsToCheck tileMap
  where
    adjacentTiles = filter (hasPaperRoll tileMap) (neighbours tileMap coords)
    coordsToCheck' = adjacentTiles ++ (coordsToCheck \\ adjacentTiles)
    tileMap' = GridMap.adjust removeRoll coords tileMap

removeRoll :: Char -> Char
removeRoll '@' = '.'
removeRoll c = error $ "Attempted to remove a non-Paper-Roll char: " ++ [c]

isAccessible :: TileMap -> XYCoordinates -> Bool
isAccessible tileMap coords =
  length neighborsWithPaperRolls < 4
  where
    neighborsWithPaperRolls =
      filter (hasPaperRoll tileMap) (neighbours tileMap coords)

hasPaperRoll :: TileMap -> XYCoordinates -> Bool
hasPaperRoll tileMap coords = (tileMap ! coords) == '@'
