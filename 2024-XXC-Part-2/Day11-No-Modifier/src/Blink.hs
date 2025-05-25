module Blink (blink) where

import Data.MemoTrie (memoFix)
import Types (Memo, Stone)

blink :: Int -> [String] -> Integer
blink n stones = sum $ map (applyBlink n) stones

applyBlink :: Int -> String -> Integer
applyBlink n stoneRaw = blinkMemo (stoneRaw, n)

blinkMemo :: Stone -> Integer
blinkMemo = memoFix applyBlink'

applyBlink' :: Memo (Stone -> Integer)
applyBlink' applyBlink' (engraving, n)
  | n == 0 = 1
  | engraving == "0" = applyBlink' ("1", n - 1)
  | even $ length engraving =
      applyBlink' (simplify left, n - 1)
        + applyBlink' (simplify right, n - 1)
  | otherwise = applyBlink' (show (2024 * read engraving :: Integer), n - 1)
  where
    half = length engraving `div` 2
    left = take half engraving
    right = drop half engraving

simplify :: String -> String
simplify s = show (read s :: Integer)
