module Util.Tile (TileMap) where

import Math.Geometry.Grid.Octagonal (RectOctGrid)
import Math.Geometry.GridMap.Lazy (LGridMap)
import Prelude hiding (lines)

type TileMap = LGridMap RectOctGrid Char
