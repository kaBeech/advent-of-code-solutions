module Util.Tuple.Text (toInts) where

import Data.Text (Text)
import Util.Text (toInt)

toInts :: (Text, Text) -> (Int, Int)
toInts (text1, text2) = (toInt text1, toInt text2)
