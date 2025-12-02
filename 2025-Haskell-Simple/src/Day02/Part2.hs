module Day02.Part2 (solvePart2) where

import Data.Text (Text, chunksOf, length, pack, splitOn, unpack)
import Safe
import Prelude hiding (length)

solvePart2 :: Text -> String
solvePart2 input = show $ sum $ concatMap invalidIds $ ranges input

-- | Find invalid Product Ids within the lower and upper bounds given.
--
-- | ==== __Examples__
--   >>> invalidIds (95,115)
--   [99,111]
invalidIds :: (Int, Int) -> [Int]
invalidIds (lower, upper) = filter invalidId [lower .. upper]

-- | ==== __Examples__
--   >>> invalidId 11
--   True
--   >>> invalidId 1234
--   False
--   >>> invalidId 111
--   True
invalidId :: Int -> Bool
invalidId productId = not $ null identicalSplits
  where
    text = pack $ show productId
    halfLength = length text `div` 2
    -- Find numbers that result in identical chunks when the text is split into
    -- chunks of that size
    identicalSplits = filter (chunksAllIdentical text) [1 .. halfLength]

-- | ==== __Examples__
--   >>> chunksAllIdentical (pack "121212") 2
--   True
--   >>> chunksAllIdentical (pack "121212") 1
--   False
--   >>> chunksAllIdentical (pack "111111") 1
--   True
--   >>> chunksAllIdentical (pack "123123") 2
--   False
chunksAllIdentical :: Text -> Int -> Bool
chunksAllIdentical text size = all (== firstChunk) chunks
  where
    firstChunk = at chunks 0
    chunks = chunksOf size text

-- | ==== __Examples__
--   >>> ranges "11-22,95-115"
--   [(11,22),(95,115)]
ranges :: Text -> [(Int, Int)]
ranges input = rangesIntPairs
  where
    rangesText = splitOn (pack ",") input
    rangesTextPairs = map (pairUp . splitOn (pack "-")) rangesText
    rangesIntPairs = map intPair rangesTextPairs

pairUp :: (Show a) => [a] -> (a, a)
pairUp (x : y : _) = (x, y)
pairUp xs = error $ "Expected a list of at least 2 items; got: " ++ show xs

intPair :: (Text, Text) -> (Int, Int)
intPair (text1, text2) = (read (unpack text1), read (unpack text2))
