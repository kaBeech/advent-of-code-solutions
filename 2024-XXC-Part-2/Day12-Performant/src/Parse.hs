module Parse
  ( parseInput,
    parseInputFlat,
  )
where

import Types (GardenFlatMap, GardenMap)

-- | Takes a string and returns a GardenMap.

-- | ==== __Examples__
--   >>> parseInput "XMA\nSXM\nASX"
--   [[('X',(0,0),0,(-1,-1)),('M',(1,0),0,(-1,-1)),('A',(2,0),0,(-1,-1))],[('S',(0,1),0,(-1,-1)),('X',(1,1),0,(-1,-1)),('M',(2,1),0,(-1,-1))],[('A',(0,2),0,(-1,-1)),('S',(1,2),0,(-1,-1)),('X',(2,2),0,(-1,-1))]]
parseInput :: String -> GardenMap
parseInput input =
  zipWith
    ( \y row ->
        zipWith (\x letter -> (letter, (x, y), 0, (-1, -1))) [0 ..] row
    )
    [0 ..]
    (lines input)

parseInputFlat :: String -> GardenFlatMap
parseInputFlat input = concat $ parseInput input
