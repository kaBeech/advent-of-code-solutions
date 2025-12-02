module Day02.Part2 (solvePart2) where

import Data.Text (Text, chunksOf, length, pack, splitOn, unpack)
import Safe
import Prelude hiding (length)

solvePart2 :: Text -> String
solvePart2 input = show $ sum $ concatMap invalidIds $ ranges input

invalidIds :: (Int, Int) -> [Int]
invalidIds (lower, upper) =
  [productId | productId <- [lower .. upper], invalidId productId]

invalidId :: Int -> Bool
invalidId productId = not $ null identicalSplits
  where
    text = pack $ show productId
    halfLength = length text `div` 2
    identicalSplits =
      [size | size <- [1 .. halfLength], chunksAllSame size text]

chunksAllSame :: Int -> Text -> Bool
chunksAllSame size text = all (== firstChunk) chunks
  where
    firstChunk = at chunks 0
    chunks = chunksOf size text

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
