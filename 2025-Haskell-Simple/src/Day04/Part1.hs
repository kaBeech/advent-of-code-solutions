module Day04.Part1 (solvePart1) where

import Data.Text (Text, pack)
import Types (Tile (..), TileMap, toTileMap)
import Util.Tile (tilesAdjacentTo)

solvePart1 :: Text -> String
solvePart1 input =
  show $ length $ filter (`hasLessThan4Neighbors` paperRolls) paperRolls
  where
    paperRolls = filter hasPaperRoll $ toTileMap input

hasPaperRoll :: Tile -> Bool
hasPaperRoll tile = tileContent tile == pack "@"

hasLessThan4Neighbors :: Tile -> TileMap -> Bool
hasLessThan4Neighbors tile tileMap =
  length (tilesAdjacentTo tile tileMap) < 4
