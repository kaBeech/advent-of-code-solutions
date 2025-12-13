module Day08.Part1 (solvePart1) where

import Data.Text (Text, lines)
import Util.Text (toXYZ)
import Prelude hiding (lines)

solvePart1 :: Text -> String
solvePart1 input = show coords
  where
    coords = map toXYZ $ lines input
