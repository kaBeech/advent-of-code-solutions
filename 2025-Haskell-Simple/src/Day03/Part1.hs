module Day03.Part1 (solvePart1) where

import Data.Text (Text, chunksOf, concat, lines)
import Safe
import Util.Text (toInt)
import Prelude hiding (concat, lines)

solvePart1 :: Text -> String
solvePart1 input = show $ sum $ map largestJoltage banks
  where
    banks = map (chunksOf 1) (lines input)

largestJoltage :: [Text] -> Int
largestJoltage bank = toInt $ concat [firstBattery, secondBattery]
  where
    -- Exclude the last battery as the first digit
    firstBattery = maximum (init bank)
    firstBatteryIndex = elemIndexJust firstBattery bank
    restOfBank = drop (1 + firstBatteryIndex) bank
    secondBattery = maximum restOfBank
