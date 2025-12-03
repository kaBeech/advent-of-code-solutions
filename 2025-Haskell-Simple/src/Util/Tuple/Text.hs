module Util.Tuple.Text (toInts) where

import Data.Text (Text)
import Util.Text (toInt)

toInts :: (Text, Text) -> (Int, Int)
toInts (first, second) = (toInt first, toInt second)
