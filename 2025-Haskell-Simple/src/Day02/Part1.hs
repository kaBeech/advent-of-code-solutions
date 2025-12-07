module Day02.Part1 (solvePart1) where

import Data.Text (Text, pack, splitOn)
import Types (toRange)
import Util.Text (firstHalf, secondHalf, toText)

solvePart1 :: Text -> String
solvePart1 input = show $ sum $ concatMap (filter isInvalidId) ranges
  where
    ranges = map toRange (splitOn (pack ",") input)

-- | ==== __Examples__
--   >>> isInvalidId 11
--   True
--   >>> isInvalidId 1234
--   False
--   >>> isInvalidId 111
--   False
isInvalidId :: Int -> Bool
isInvalidId productId = firstHalf productId' == secondHalf productId'
  where
    productId' = toText productId
