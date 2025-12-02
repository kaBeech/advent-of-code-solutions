module Day1.Part2 (solvePart2) where

import Data.Text (Text, lines, unpack)
import Day1.Part2.Dial (followInstructions, startingDial)
import Prelude hiding (lines)

solvePart2 :: Text -> String
solvePart2 input = show password
  where
    (password, _finalDial) = followInstructions (0, startingDial) instructions
    instructions = map unpack $ lines input
