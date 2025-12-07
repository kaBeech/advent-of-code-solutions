module Util.Text
  ( halfLength,
    firstHalf,
    secondHalf,
    toBounds,
    toInt,
    toInts,
    toRange,
    toText,
  )
where

import Data.Graph (Bounds)
import Data.Text (Text, drop, length, pack, show, splitOn, take, unpack)
import Util.Tuple (mapT, pairUp)
import Prelude hiding (drop, length, take)

toInt :: Text -> Int
toInt text = read $ unpack text

toInts :: (Text, Text) -> (Int, Int)
toInts = mapT toInt

toBounds :: Text -> Bounds
toBounds text = case (pairUp . splitOn (pack "-")) text of
  [(lowerBound, upperBound)] -> (toInt lowerBound, toInt upperBound)
  _ -> error $ "Expected a single range in text; got: " ++ Prelude.show text

-- | ==== __Examples__
--   >>> toRange "11-22,95-115"
--   [(11,22),(95,115)]
toRange :: Text -> [Int]
toRange text = [lowerBound .. upperBound]
  where
    (lowerBound, upperBound) = toBounds text

-- | This is useful when we want to use both Prelude.show and Data.Text.show in
--   the same module without qualifying them
toText :: (Show a) => a -> Text
toText = Data.Text.show

halfLength :: Text -> Int
halfLength text = length text `div` 2

firstHalf :: Text -> Text
firstHalf text = take (halfLength text) text

secondHalf :: Text -> Text
secondHalf text = drop (halfLength text) text
