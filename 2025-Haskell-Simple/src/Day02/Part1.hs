module Day02.Part1 (solvePart1) where

import Data.Text (Text, pack, splitOn, unpack)

solvePart1 :: Text -> String
solvePart1 input = show $ sum $ concatMap invalidIds $ ranges input

invalidIds :: (Int, Int) -> [Int]
invalidIds (lower, upper) = [n | n <- [lower .. upper], invalidId n]

invalidId :: Int -> Bool
invalidId n = take halfLength n' == drop halfLength n'
  where
    n' = show n
    halfLength = length n' `div` 2

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
