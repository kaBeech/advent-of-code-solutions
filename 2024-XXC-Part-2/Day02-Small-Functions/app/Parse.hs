module Parse
  ( parseInput,
  )
where

-- Takes a path to a file such as "test_input.dat"
--
-- The file should contain a string of this format:
-- ```
-- 7 6 4 2 1
-- 1 2 7 8 9
-- 9 7 6 2 1
-- 1 3 2 4 5
-- 8 6 4 4 1
-- 1 3 6 7 9
-- ```
-- Returns a list of lists of integers:
-- [[7, 6, 4, 2, 1], [1, 2, 7, 8, 9], [9, 7, 6, 2, 1], [1, 3, 2, 4, 5], [8, 6, 4, 4, 1], [1, 3, 6, 7, 9]]
parseInput :: String -> [[Int]]
parseInput input = map (map read . words) (lines input)
