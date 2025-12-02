module Day02.Part2 (solvePart2) where

import Data.Text (Text, chunksOf, length, pack, splitOn, unpack)
import Safe
import Prelude hiding (length)

solvePart2 :: Text -> String
solvePart2 input = show $ sum $ concatMap invalidIds $ ranges input

-- | Find invalid Product Ids within the lower and upper bounds given.
--
--   If this list comprehension technique is unfamiliar, check out the
--   following webpage:
--   https://learnyouahaskell.github.io/starting-out.html#im-a-list-comprehension
--
-- | ==== __Examples__
--   >>> invalidIds (95,115)
--   [99,111]
invalidIds :: (Int, Int) -> [Int]
invalidIds (lower, upper) =
  [productId | productId <- [lower .. upper], invalidId productId]

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
    identicalSplits =
      [size | size <- [1 .. halfLength], chunksAllIdentical size text]

-- | ==== __Examples__
--   >>> chunksAllIdentical 2 (pack "121212")
--   True
--   >>> chunksAllIdentical 1 (pack "121212")
--   False
--   >>> chunksAllIdentical 1 (pack "111111")
--   True
--   >>> chunksAllIdentical 2 (pack "123123")
--   False
chunksAllIdentical :: Int -> Text -> Bool
chunksAllIdentical size text = all (== firstChunk) chunks
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
