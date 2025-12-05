module Day04.Part2 (solvePart2) where

import Data.Text (Text, pack)
import Types (Tile (..), TileMap, toTileMap)
import Util.Tile (tilesAdjacentTo)

solvePart2 :: Text -> String
solvePart2 input =
  show $ length allPaperRolls - length remainingPaperRolls
  where
    tileMap = toTileMap input
    allPaperRolls = filter hasPaperRoll tileMap
    remainingPaperRolls =
      filter hasPaperRoll $ removeAllAccessiblePaperRolls tileMap

removeAllAccessiblePaperRolls :: TileMap -> TileMap
removeAllAccessiblePaperRolls = removeAllAccessiblePaperRolls' []

removeAllAccessiblePaperRolls' :: TileMap -> TileMap -> TileMap
removeAllAccessiblePaperRolls' previous tileMap
  | paperRollsDiff previous tileMap == 0 = tileMap
  | otherwise = removeAllAccessiblePaperRolls' tileMap (removeAccessiblePaperRolls tileMap)

removeAccessiblePaperRolls :: TileMap -> TileMap
removeAccessiblePaperRolls tileMap = map (removePaperRollIfAccessible tileMap) tileMap

removePaperRollIfAccessible :: [Tile] -> Tile -> Tile
removePaperRollIfAccessible tileMap tile
  | hasAccessiblePaperRoll tileMap tile =
      tile {tileContent = pack "."}
  | otherwise = tile

hasAccessiblePaperRoll :: [Tile] -> Tile -> Bool
hasAccessiblePaperRoll tileMap tile =
  hasPaperRoll tile && hasLessThan4Neighbors tileMap tile

hasLessThan4Neighbors :: [Tile] -> Tile -> Bool
hasLessThan4Neighbors tileMap tile =
  length (tilesAdjacentTo tile (withPaperRolls tileMap)) < 4

withPaperRolls :: [Tile] -> [Tile]
withPaperRolls = filter hasPaperRoll

hasPaperRoll :: Tile -> Bool
hasPaperRoll tile = tileContent tile == pack "@"

paperRollsDiff :: TileMap -> TileMap -> Int
paperRollsDiff tileMap tileMap' =
  length (withPaperRolls tileMap) - length (withPaperRolls tileMap')
