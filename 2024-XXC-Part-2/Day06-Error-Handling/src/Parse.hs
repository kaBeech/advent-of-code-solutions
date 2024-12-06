module Parse
  ( parseInput,
  )
where

import Types (AreaMap, Simulation)

-- | Takes a raw input string and returns an initialized Simulation.

-- | ==== __Examples__
--   >>> parseInput ".#.\n.^.\n#.#"
--   (1,(1,1),3,[[(True,False,(0,0)),(False,False,(1,0)),(True,False,(2,0))],[(True,False,(0,1)),(True,True,(1,1)),(True,False,(2,1))],[(False,False,(0,2)),(True,False,(1,2)),(False,False,(2,2))]])
parseInput :: String -> Simulation
parseInput input =
  let areaMap = getAreaMap input
      currentPos = getCurrentPos areaMap input
      currentDir = 3 -- 3 = Up
      visitedCount = 1
   in (visitedCount, currentPos, currentDir, areaMap)

-- | Takes an AreaMap and a raw input string, validates the AreaMap, and
--   returns the starting position.
--
--   The raw input string is taken only so that if an error is thrown during
--   validation, the input string can be printed in the error message.

-- | ==== __Examples__
--   >>> getCurrentPos [[(True,False,(0,0)),(False,False,(1,0)),(True,False,(2,0))],[(True,False,(0,1)),(True,True,(1,1)),(True,False,(2,1))],[(False,False,(0,2)),(True,False,(1,2)),(False,False,(2,2))]] ".#.\n.^.\n#.#"
--   (1,1)
getCurrentPos :: AreaMap -> String -> (Int, Int)
getCurrentPos areaMap input =
  case filter (\(_, visited, _) -> visited) (concat areaMap) of
    [] -> error ("No valid starting position found in input: " ++ input)
    [(_, _, (x, y))] -> (x, y)
    positions ->
      error
        ( "Multiple valid starting positions found in input. Input: \""
            ++ input
            ++ "\" Valid Starting Positions: "
            ++ show positions
        )

-- | Takes a raw input string and returns an AreaMap.

-- | ==== __Examples__
--   >>> getAreaMap ".#.\n.^.\n#.#"
--   [[(True,False,(0,0)),(False,False,(1,0)),(True,False,(2,0))],[(True,False,(0,1)),(True,True,(1,1)),(True,False,(2,1))],[(False,False,(0,2)),(True,False,(1,2)),(False,False,(2,2))]]
getAreaMap :: String -> AreaMap
getAreaMap input =
  zipWith
    ( \y row ->
        zipWith (\x c -> (fst (parseChar c), snd (parseChar c), (x, y))) [0 ..] row
    )
    [0 ..]
    (lines input)

-- | Detirmine whether an area is empty and whether it has beeen visited.
--   Output in Bools: (Empty, Visited)
parseChar :: Char -> (Bool, Bool)
parseChar '#' = (False, False)
parseChar '.' = (True, False)
parseChar '^' = (True, True)
parseChar c = error ("Invalid character in input. Char must be '#', '.', or '^'. Got: " ++ show c)
