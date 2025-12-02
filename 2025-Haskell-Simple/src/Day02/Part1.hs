module Day02.Part1 (solvePart1) where

import Data.Text (Text, pack, splitOn, unpack)

solvePart1 :: Text -> String
solvePart1 input = show $ sum $ concatMap invalidIds $ ranges input

-- | If this list comprehension technique is unfamiliar, check out the
--   following webpage:
--   https://learnyouahaskell.github.io/starting-out.html#im-a-list-comprehension
invalidIds :: (Int, Int) -> [Int]
invalidIds (lower, upper) =
  [productId | productId <- [lower .. upper], invalidId productId]

invalidId :: Int -> Bool
invalidId productId = take halfLength text == drop halfLength text
  where
    text = show productId
    halfLength = length text `div` 2

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
intPair (t, t') = (read (unpack t), read (unpack t'))
