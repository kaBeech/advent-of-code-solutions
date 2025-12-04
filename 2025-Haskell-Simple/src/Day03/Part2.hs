module Day03.Part2 (solvePart2) where

import Data.Text (Text, chunksOf, concat, lines)
import Safe
import Util.Text (toInt, toText)
import Prelude hiding (concat, lines)

solvePart2 :: Text -> String
solvePart2 input = show $ sum $ map largestJoltageOf $ banksFrom input

banksFrom :: Text -> [[Text]]
banksFrom input = map (chunksOf 1) (lines input)

largestJoltageOf :: [Text] -> Int
largestJoltageOf bank = toInt $ concat $ fillOutBatteries [] bank

fillOutBatteries :: [Text] -> [Text] -> [Text]
fillOutBatteries batteries bank
  | batteriesRemaining == 0 = batteries
  | otherwise = fillOutBatteries (batteries ++ [nextBattery]) restOfBank
  where
    batteriesRemaining = 12 - length batteries
    (nextBattery, restOfBank) =
      getNextBattery bank batteriesRemaining 9

getNextBattery :: [Text] -> Int -> Int -> (Text, [Text])
getNextBattery bank batteriesRemaining maxSingleBatteryJoltage
  | isTooFarRightToFit highestJoltageBattery =
      getNextBattery bank batteriesRemaining (toInt highestJoltageBattery - 1)
  | otherwise = (highestJoltageBattery, restOfBank)
  where
    highestJoltageBattery =
      maximum $ filter (toText maxSingleBatteryJoltage >=) bank
    restOfBank = drop (elemIndexJust highestJoltageBattery bank + 1) bank
    isTooFarRightToFit battery =
      elemIndexJust battery bank > length bank - batteriesRemaining
