module Day04.Part1 (solvePart1) where

import Data.Text (Text, pack)
import Types (Tile (..), TileMap, toTileMap)
import Util.Tile (tilesAdjacentTo)

solvePart1 :: Text -> String
solvePart1 input =
  show $ length $ filter (hasAccessiblePaperRoll tileMap) tileMap
  where
    tileMap = toTileMap input

hasAccessiblePaperRoll :: TileMap -> Tile -> Bool
hasAccessiblePaperRoll tileMap tile =
  hasPaperRoll tile && hasLessThan4Neighbors tileMap tile

hasLessThan4Neighbors :: TileMap -> Tile -> Bool
hasLessThan4Neighbors tileMap tile =
  length (tilesAdjacentTo tile (withPaperRolls tileMap)) < 4

withPaperRolls :: TileMap -> TileMap
withPaperRolls = filter hasPaperRoll

hasPaperRoll :: Tile -> Bool
hasPaperRoll tile = tileContent tile == pack "@"
