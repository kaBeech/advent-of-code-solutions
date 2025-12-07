module Day06.Part1 (solvePart1) where

import Data.Text (Text, unpack)

solvePart1 :: Text -> String
solvePart1 input = show $ length $ unpack input
