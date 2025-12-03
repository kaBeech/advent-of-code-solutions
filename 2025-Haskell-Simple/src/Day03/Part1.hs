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
largestJoltageOf bank = toInt $ append firstBattery secondBattery
  where
    firstBattery = getFirstBatteryFrom bank
    firstBatteryIndex = elemIndexJust firstBattery bank
    restOfBank = drop (firstBatteryIndex + 1) bank
    secondBattery = maximum restOfBank

getFirstBatteryFrom :: [Text] -> Text
getFirstBatteryFrom bank
  | isLastBattery highestJoltageBattery bank = highestJoltageBattery
  | otherwise = secondHighestJoltageBattery
  where
    highestJoltageBattery = maximum bank
    secondHighestJoltageBattery = maximum (init bank)

isLastBattery :: Text -> [Text] -> Bool
isLastBattery battery bank = elemIndexJust battery bank == length bank - 1
