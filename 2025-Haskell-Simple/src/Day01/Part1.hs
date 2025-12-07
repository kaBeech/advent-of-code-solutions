module Day01.Part1 (solvePart1) where

import Data.Text (Text, lines, unpack)
import Prelude hiding (lines)

-- | I'm aware this can be done in a more simple and performant manner using
--   arithmatic on Ints instead of the dial method used here. However, I was
--   having fun using cycles since they closely represent a dial.
solvePart1 :: Text -> String
solvePart1 input = show password
  where
    (password, _finalDial) =
      followInstructions (0, startingDial) instructions
    instructions = map unpack $ lines input

-- [50..99,0,1..]
startingDial :: [Int]
startingDial = drop 50 $ cycle [0 .. 99]

turn :: [Int] -> Char -> Int -> [Int]
turn dial 'R' clicks = drop clicks dial
turn dial 'L' clicks = drop clicksAdjusted dial
  where
    -- Since we can't go backwards in our list, this calculation simulates it
    -- by going forward by an inverted number of clicks.
    clicksAdjusted = 100 - (clicks `mod` 100)
turn _ direction _ =
  error $
    "Invalid direction. Expecting 'L' or 'R'; got: " ++ [direction]

-- | ==== __Examples__
--   >>> followInstructions (0 startingDial) ["R55", "L5"]
--   (1,[0,1,2,3,4..])
followInstructions :: (Int, [Int]) -> [String] -> (Int, [Int])
followInstructions = foldl followInstruction

-- | ==== __Examples__
--   >>> followInstruction (initPassword, startingDial) "R55"
--   (0,[5,6,7,8,9..])
--   >>> followInstruction (initPassword, [5,6,7,8,9..]) "L5"
--   (1,[0,1,2,3,4..])
followInstruction :: (Int, [Int]) -> String -> (Int, [Int])
followInstruction (password, dial) (direction : clicks) = (password', dial')
  where
    dial' = turn dial direction $ read clicks
    password' = incrementPassword password dial'
followInstruction _ instruction =
  error $ "Instruction not long enough; got: " ++ instruction

-- | Every time the dial shows 0 after a turn, increment the password by 1.
--
-- ==== __Examples__
-- >>> incrementPassword 0 [5,6,7,8..]
-- 0
-- >>> incrementPassword 0 [0,1,2,3..]
-- 1
incrementPassword :: Int -> [Int] -> Int
incrementPassword password (0 : _) = password + 1
incrementPassword password _dial = password
