module Blink (blink) where

blink :: [String] -> [String]
blink = concatMap applyBlink

applyBlink :: String -> [String]
applyBlink stone
  | stone == "0" = ["1"]
  | even $ length stone = [left, right]
  | otherwise = [show $ 2024 * read stone]
  where
    half = length stone `div` 2
    left = take half stone
    right = drop half stone
