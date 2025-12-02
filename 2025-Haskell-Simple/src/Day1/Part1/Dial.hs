module Day1.Part1.Dial (followInstructions, startingDial, turn) where

-- | The dial is an infinitely repeating list of numbers from 0 to 99.
--
--   At the beginning of the puzzle, the dial is set to 50; i.e. 50 is the
--   first number in the list.
startingDial :: [Int]
startingDial = drop 50 $ cycle [0 .. 99]

turn :: [Int] -> Char -> Int -> [Int]
turn dial 'R' clicks = drop clicks dial
turn dial 'L' clicks = drop clicksAdjusted dial
  where
    clicksAdjusted = 100 - (clicks `mod` 100)
turn _ direction _ =
  error $
    "Invalid direction. Expecting 'L' or 'R'; got: " ++ [direction]

followInstructions :: (Int, [Int]) -> [String] -> (Int, [Int])
followInstructions = foldl followInstruction

followInstruction :: (Int, [Int]) -> String -> (Int, [Int])
followInstruction (password, dial) (direction : clicks) = (password', dial')
  where
    password' = incrementPassword password dial'
    dial' = turn dial direction $ read clicks
followInstruction _ instruction =
  error $ "Instruction not long enough; got: " ++ instruction

-- | Every time the dial shows 0 after a turn, increment the password by 1.
incrementPassword :: Int -> [Int] -> Int
incrementPassword password (0 : _otherNumbers) = password + 1
incrementPassword password _dial = password
