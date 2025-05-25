module Parse
  ( parseInput,
    parseInputFlat,
  )
where

import Types (GardenFlatMap, GardenMap)

-- | Takes a string and returns a GardenMap.

-- | ==== __Examples__
--   >>> parseInput "XMA\nSXM\nASX"
--   [[('X',(0,0),0),('M',(1,0),0),('A',(2,0),0)],[('S',(0,1),0),('X',(1,1),0),('M',(2,1),0)],[('A',(0,2),0),('S',(1,2),0),('X',(2,2),0)]]
parseInput :: String -> GardenMap
parseInput input =
  zipWith
    ( \y row ->
        zipWith (\x letter -> (letter, (x, y), 0)) [0 ..] row
    )
    [0 ..]
    (lines input)

parseInputFlat :: String -> GardenFlatMap
parseInputFlat input = concat $ parseInput input
