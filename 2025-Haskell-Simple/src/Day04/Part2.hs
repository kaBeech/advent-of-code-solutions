module Day04.Part2 (solvePart2) where

import Data.Text (Text, pack)
import Types (Tile (..), TileMap, toTileMap)
import Util.Tile (tilesAdjacentTo)

solvePart2 :: Text -> String
solvePart2 input =
  show $ length allPaperRolls - length remainingPaperRolls
  where
    allPaperRolls = filter hasPaperRoll $ toTileMap input
    remainingPaperRolls = removeRolls allPaperRolls allPaperRolls

hasPaperRoll :: Tile -> Bool
hasPaperRoll tile = tileContent tile == pack "@"

hasLessThan4Neighbors :: Tile -> TileMap -> Bool
hasLessThan4Neighbors tile tileMap =
  length (tilesAdjacentTo tile tileMap) < 4

removeRolls :: [Tile] -> [Tile] -> [Tile]
removeRolls [] tileMap = tileMap
removeRolls (roll : rollsToRemove) tileMap
  | roll `elem` tileMap
      && hasLessThan4Neighbors roll tileMap =
      removeRolls (adjacentTiles ++ rollsToRemove) $ filter (/= roll) tileMap
  | otherwise = removeRolls rollsToRemove tileMap
  where
    adjacentTiles = tilesAdjacentTo roll tileMap
