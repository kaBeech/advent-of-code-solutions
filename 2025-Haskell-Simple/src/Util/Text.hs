module Util.Text (halfLength, firstHalf, secondHalf, toInt, toText) where

import Data.Text (Text, drop, length, show, take, unpack)
import Prelude hiding (drop, length, show, take)

toInt :: Text -> Int
toInt text = read $ unpack text

-- | This is useful when we want to use both Prelude.show and Data.Text.show in
--   the same module without qualifying them
toText :: (Show a) => a -> Text
toText = show

halfLength :: Text -> Int
halfLength text = length text `div` 2

firstHalf :: Text -> Text
firstHalf text = take (halfLength text) text

secondHalf :: Text -> Text
secondHalf text = drop (halfLength text) text
