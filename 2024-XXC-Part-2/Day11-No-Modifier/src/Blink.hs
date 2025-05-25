module Blink (blink, blinkV2) where

blink :: [String] -> [String]
blink = concatMap applyBlink

applyBlink :: String -> [String]
applyBlink stone
  | stone == "0" = ["1"]
  | even $ length stone = [simplify left, simplify right]
  | otherwise = [show (2024 * read stone :: Integer)]
  where
    half = length stone `div` 2
    left = take half stone
    right = drop half stone

simplify :: String -> String
simplify s = show (read s :: Integer)

blinkV2 :: Int -> [String] -> [String]
blinkV2 n = concatMap (applyBlinkV2 n)

applyBlinkV2 :: Int -> String -> [String]
applyBlinkV2 n stone = applyBlinkV2' n [stone]

applyBlinkV2' :: Int -> [String] -> [String]
applyBlinkV2' 0 stone = stone
applyBlinkV2' n ["0"] = applyBlinkV2' (n - 1) ["1"]
applyBlinkV2' n [stone] =
  if even $ length stone
    then applyBlinkV2' (n - 1) [simplify left] ++ applyBlinkV2' (n - 1) [simplify right]
    else applyBlinkV2' (n - 1) [show (2024 * read stone :: Integer)]
  where
    half = length stone `div` 2
    left = take half stone
    right = drop half stone
applyBlinkV2' _ _ = error "Invalid input for applyBlinkV2'"
