module Day03.Part1 (solvePart1) where

import Data.Text (Text, append, chunksOf, lines)
import Safe
import Util.Text (toInt)
import Prelude hiding (lines)

solvePart1 :: Text -> String
solvePart1 input = show $ sum $ map largestJoltageOf $ banksFrom input

banksFrom :: Text -> [[Text]]
banksFrom input = map (chunksOf 1) (lines input)

largestJoltageOf :: [Text] -> Int
largestJoltageOf bank = toInt $ append firstBattery' secondBattery
  where
    firstBattery = maximum bank
    firstBatteryIndex = elemIndexJust firstBattery bank
    firstBattery' =
      if firstBatteryIndex < length bank - 1
        then firstBattery
        else maximum (init bank)
    firstBatteryIndex' = elemIndexJust firstBattery' bank
    restOfBank = drop (firstBatteryIndex' + 1) bank
    secondBattery = maximum restOfBank
