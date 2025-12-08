module Day02.Part2 (solvePart2) where

import Data.Text (Text, chunksOf, pack, splitOn)
import Safe
import Util.Text (halfLength, toRange, toText)

solvePart2 :: Text -> String
solvePart2 input = show $ sum $ concatMap (filter isInvalidId) ranges
  where
    ranges = map toRange (splitOn (pack ",") input)

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
hasIdenticalSplits text =
  any (allChunksIdentical text) [1 .. halfLength text]

-- | ==== __Examples__
--   >>> allChunksIdentical (pack "123123") 3
--   True
--   >>> allChunksIdentical (pack "123123") 2
--   False
allChunksIdentical :: Text -> Int -> Bool
allChunksIdentical text size = all (== firstChunk) chunks
  where
    chunks = chunksOf size text
    firstChunk = at chunks 0
