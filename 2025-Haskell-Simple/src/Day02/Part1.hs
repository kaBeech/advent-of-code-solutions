module Day02.Part1 (solvePart1) where

import Data.Text (Text, pack, splitOn)
import Util.Text (firstHalf, secondHalf, toText)
import Util.Tuple (pairUp)
import Util.Tuple.Text (toInts)

solvePart1 :: Text -> String
solvePart1 input = show $ sum $ concatMap invalidIdsIn $ rangesFrom input

-- | ==== __Examples__
--   >>> invalidIdsIn (95,115)
--   [99]
invalidIdsIn :: (Int, Int) -> [Int]
invalidIdsIn (lowerBound, upperBound) =
  filter isInvalidId [lowerBound .. upperBound]

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

-- | ==== __Examples__
--   >>> rangesFrom "11-22,95-115"
--   [(11,22),(95,115)]
rangesFrom :: Text -> [(Int, Int)]
rangesFrom input = map toInts $ boundariesOf $ textRangesFrom input

boundariesOf :: [Text] -> [(Text, Text)]
boundariesOf = concatMap (pairUp . splitOn (pack "-"))

textRangesFrom :: Text -> [Text]
textRangesFrom = splitOn (pack ",")
