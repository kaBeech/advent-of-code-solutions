module ParseInput
  ( parseInput,
  )
where

-- Takes a path to a file such as "test_input.dat"
--
-- The file should contain a string of this format:
-- ```
-- 3   4
-- 4   3
-- 2   5
-- 1   3
-- 3   9
-- 3   3
-- ```
-- Returns a tuple of two lists of integers:
-- ([3, 4, 2, 1, 3, 3], [4, 3, 5, 3, 9, 3])
parseInput :: String -> ([Int], [Int])
parseInput input =
  let lines' = lines input -- Split into lines
  -- Parse each line into a tuple of two integers
      pairs = map parseLine lines'
      -- Unzip the list of pairs into a pair of lists
      (firstNums, secondNums) = unzip pairs
   in (firstNums, secondNums)
  where
    parseLine :: String -> (Int, Int)
    parseLine line =
      let words' = words line -- Split line into words
          x = read (head words') :: Int -- Parse first number
          y = read (words' !! 1) :: Int -- Parse second number
       in (x, y)
