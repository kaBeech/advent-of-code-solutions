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

blinkV2 :: Int -> [String] -> Integer
blinkV2 n stones = sum $ map (applyBlinkV2 n) stones

applyBlinkV2 :: Int -> String -> Integer
applyBlinkV2 n stoneRaw = blinkMemo (stoneRaw, n)

applyBlinkV2' :: Memo (Stone -> Integer)
applyBlinkV2' applyBlinkV2' (engraving, n)
  | n == 0 = 1
  | engraving == "0" = applyBlinkV2' ("1", n - 1)
  | otherwise =
      if even $ length engraving
        then applyBlinkV2' (simplify left, n - 1) + applyBlinkV2' (simplify right, n - 1)
        else applyBlinkV2' (show (2024 * read engraving :: Integer), n - 1)
  where
    half = length engraving `div` 2
    left = take half engraving
    right = drop half engraving

blinkMemo :: Stone -> Integer
blinkMemo = memoFix applyBlinkV2'
