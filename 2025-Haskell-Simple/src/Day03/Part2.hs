module Day03.Part2 (solvePart2) where

import Data.Text (Text, chunksOf, concat, lines)
import Safe
import Util.Text (toInt)
import Prelude hiding (concat, lines)

solvePart2 :: Text -> String
solvePart2 input = show $ sum $ map largestJoltageOf $ banksFrom input

banksFrom :: Text -> [[Text]]
banksFrom input = map (chunksOf 1) (lines input)

largestJoltageOf :: [Text] -> Int
largestJoltageOf bank = toInt $ concat $ reverse $ fillOutBatteries bank []

fillOutBatteries :: [Text] -> [Text] -> [Text]
fillOutBatteries bank batteries
  | batteriesRemaining == 0 = batteries
  | otherwise = fillOutBatteries remainingBank (nextBattery : batteries)
  where
    batteriesRemaining = 12 - length batteries
    (nextBattery, remainingBank) = nextBatteryFrom bank batteriesRemaining 9

nextBatteryFrom :: [Text] -> Int -> Int -> (Text, [Text])
nextBatteryFrom bank batteriesRemaining maxJoltage
  | isTooFarRightToFit highestJoltageBattery bank batteriesRemaining =
      nextHighestJoltageBattery
  | otherwise = (highestJoltageBattery, remainingBank)
  where
    highestJoltageBattery = maximum (filter (\batt -> toInt batt <= maxJoltage) bank)
    remainingBank = restOfBank highestJoltageBattery bank
    nextHighestJoltageBattery =
      nextBatteryFrom bank batteriesRemaining (toInt highestJoltageBattery - 1)

restOfBank :: Text -> [Text] -> [Text]
restOfBank battery bank = drop (elemIndexJust battery bank + 1) bank

isTooFarRightToFit :: Text -> [Text] -> Int -> Bool
isTooFarRightToFit battery bank batteriesRemaining =
  elemIndexJust battery bank > length bank - batteriesRemaining
