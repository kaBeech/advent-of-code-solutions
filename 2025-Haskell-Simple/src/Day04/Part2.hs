module Day04.Part2 (solvePart2) where

import Data.List (partition)
import Data.Text (Text, pack)
import Types (Tile (..), TileMap, toTileMap)
import Util.Tile (tilesAdjacentTo)

solvePart2 :: Text -> String
solvePart2 input =
  show $ length allPaperRolls - length remainingPaperRolls
  where
    tileMap = toTileMap input
    allPaperRolls = filter hasPaperRoll tileMap
    remainingPaperRolls = removeAllAccessiblePaperRolls allPaperRolls

hasPaperRoll :: Tile -> Bool
hasPaperRoll tile = tileContent tile == pack "@"

removeAllAccessiblePaperRolls :: TileMap -> TileMap
removeAllAccessiblePaperRolls previousMap
  | null removedRolls = newMap
  | otherwise =
      removeAllAccessiblePaperRolls newMap
  where
    (removedRolls, newMap) = removeAccessiblePaperRolls previousMap

removeAccessiblePaperRolls :: TileMap -> (TileMap, TileMap)
removeAccessiblePaperRolls tileMap =
  partition (hasLessThan4Neighbors tileMap) tileMap

hasLessThan4Neighbors :: TileMap -> Tile -> Bool
hasLessThan4Neighbors tileMap tile =
  length (tilesAdjacentTo tile tileMap) < 4
