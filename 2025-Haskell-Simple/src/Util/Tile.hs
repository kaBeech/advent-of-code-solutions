module Util.Tile (TileMap, TileMapRectOmni, TileMapRectOrtho) where

import Math.Geometry.Grid.Octagonal (RectOctGrid)
import Math.Geometry.Grid.Square (RectSquareGrid)
import Math.Geometry.GridMap.Lazy (LGridMap)
import Prelude hiding (lines)

type TileMap = TileMapRectOmni

type TileMapRectOmni = LGridMap RectOctGrid Char

type TileMapRectOrtho = LGridMap RectSquareGrid Char
