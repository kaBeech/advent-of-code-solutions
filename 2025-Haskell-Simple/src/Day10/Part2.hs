module Day10.Part2 (solvePart2) where

import Data.Text (Text, unpack)

solvePart2 :: Text -> String
solvePart2 input = show $ length $ unpack input
