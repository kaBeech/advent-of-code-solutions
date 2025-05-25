module Parse (parseInput) where

-- | Takes a string and returns a CharMap.

-- | ==== __Examples__
--   >>> parseInput "1 2 34 5"
--   ["1","2","34","5']
parseInput :: String -> [String]
parseInput = words
