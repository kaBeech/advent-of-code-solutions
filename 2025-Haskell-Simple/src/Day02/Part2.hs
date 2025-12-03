module Day02.Part2 (solvePart2) where

import Data.Text (Text, chunksOf, pack, splitOn)
import Safe
import Util.Text (halfLength, toText)
import Util.Tuple (pairUp)
import Util.Tuple.Text (toInts)

solvePart2 :: Text -> String
solvePart2 input = show $ sum $ concatMap invalidIdsIn $ rangesFrom input

-- | ==== __Examples__
--   >>> invalidIdsIn (95,115)
--   [99,111]
invalidIdsIn :: (Int, Int) -> [Int]
invalidIdsIn (lowerBound, upperBound) =
  filter isInvalidId [lowerBound .. upperBound]

-- | ==== __Examples__
--   >>> isInvalidId 11
--   True
--   >>> isInvalidId 1234
--   False
--   >>> isInvalidId 111
--   True
isInvalidId :: Int -> Bool
isInvalidId productId = hasIdenticalSplits $ toText productId

hasIdenticalSplits :: Text -> Bool
hasIdenticalSplits productId = not $ null $ identicalSplitsIn productId

-- Find numbers that result in identical chunks when the text is split into
-- chunks of that size
identicalSplitsIn :: Text -> [Int]
identicalSplitsIn text =
  filter (allChunksIdentical text) [1 .. halfLength text]

-- | ==== __Examples__
--   >>> allChunksIdentical (pack "121212") 2
--   True
--   >>> allChunksIdentical (pack "121212") 1
--   False
--   >>> allChunksIdentical (pack "111111") 1
--   True
--   >>> allChunksIdentical (pack "123123") 2
--   False
allChunksIdentical :: Text -> Int -> Bool
allChunksIdentical text size = all' chunks (== firstChunk)
  where
    all' = flip all
    chunks = chunksOf size text
    firstChunk = at chunks 0

-- | ==== __Examples__
--   >>> rangesFrom "11-22,95-115"
--   [(11,22),(95,115)]
rangesFrom :: Text -> [(Int, Int)]
rangesFrom input = map toInts $ boundariesOf $ textRangesFrom input

boundariesOf :: [Text] -> [(Text, Text)]
boundariesOf = concatMap (pairUp . splitOn (pack "-"))

textRangesFrom :: Text -> [Text]
textRangesFrom = splitOn (pack ",")
