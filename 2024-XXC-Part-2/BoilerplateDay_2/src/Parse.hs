module Parse
  ( parseInput,
    parseInputFlat,
  )
where

import Types (CharMap)

-- | Takes a string and returns a CharMap.

-- | ==== __Examples__
--   >>> parseInput "XMA\nSXM\nASX"
--   [[('X',(0,0)),('M',(1,0)),('A',(2,0))],[('S',(0,1)),('X',(1,1)),('M',(2,1))],[('A',(0,2)),('S',(1,2)),('X',(2,2))]]
parseInput :: String -> CharMap
parseInput input =
  zipWith
    ( \y row ->
        zipWith (\x letter -> (letter, (x, y))) [0 ..] row
    )
    [0 ..]
    (lines input)

parseInputFlat :: String -> CharFlatMap
parseInputFlat input = concat $ parseInput input
