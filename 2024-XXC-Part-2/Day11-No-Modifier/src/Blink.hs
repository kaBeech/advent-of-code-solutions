module Blink (blink) where

blink :: [String] -> [String]
blink = concatMap applyBlink

applyBlink :: String -> [String]
applyBlink stone
  | stone == "0" = ["1"]
  | even $ length stone = [simplify left, simplify right]
  | otherwise = [show $ 2024 * read stone]
  where
    half = length stone `div` 2
    left = take half stone
    right = drop half stone

simplify :: String -> String
simplify s = show (read s :: Integer)
