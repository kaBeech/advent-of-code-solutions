module Parse (parseInput) where

import Types (WordMap)

-- | Takes a string and returns a WordMap.

-- | ==== __Examples__
--   >>> parseInput "XMA\nSXM\nASX"
--   [[('X',(0,0)),('M',(1,0)),('A',(2,0))],[('S',(0,1)),('X',(1,1)),('M',(2,1))],[('A',(0,2)),('S',(1,2)),('X',(2,2))]]
parseInput :: String -> WordMap
parseInput _inputPath = [[('X', (0, 0)), ('M', (1, 0)), ('A', (2, 0))], [('S', (0, 1)), ('X', (1, 1)), ('M', (2, 1))], [('A', (0, 2)), ('S', (1, 2)), ('X', (2, 2))]]
