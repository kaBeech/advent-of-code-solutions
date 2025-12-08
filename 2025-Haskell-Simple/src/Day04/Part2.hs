module Day04.Part2 (solvePart2) where

import Data.Text (Text, pack)
import Util.Tile (Tile, TileMap, adjacent, content, toTileMap)

solvePart2 :: Text -> String
solvePart2 input =
  show $ length originalPaperRolls - length remainingPaperRolls
  where
    originalPaperRolls = filter hasPaperRoll $ toTileMap input
    remainingPaperRolls = removeRolls originalPaperRolls originalPaperRolls

hasPaperRoll :: Tile -> Bool
hasPaperRoll tile = content tile == pack "@"

hasLessThan4Neighbors :: Tile -> TileMap -> Bool
hasLessThan4Neighbors tile tileMap =
  length (filter (adjacent tile) tileMap) < 4

removeRolls :: [Tile] -> [Tile] -> [Tile]
removeRolls [] tileMap = tileMap
removeRolls (roll : rollsToRemove) tileMap
  | hasLessThan4Neighbors roll tileMap =
      removeRolls (adjacentTiles ++ dedup rollsToRemove) $
        filter (/= roll) tileMap
  | otherwise = removeRolls rollsToRemove tileMap
  where
    adjacentTiles = filter (adjacent roll) tileMap
    dedup = filter (`notElem` adjacentTiles)
