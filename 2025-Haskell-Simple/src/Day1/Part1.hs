module Day1.Part1 (solvePart1) where

import Data.Text (Text, lines, unpack)
import Day1.Dial (followInstructions, startingDial)
import Prelude hiding (lines)

solvePart1 :: Text -> String
solvePart1 input = show password
  where
    (password, _finalDial) = followInstructions (0, startingDial) instructions
    instructions = map unpack $ lines input
