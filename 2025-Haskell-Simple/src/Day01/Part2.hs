module Day01.Part2 (solvePart2) where

import Data.Text (Text, lines, unpack)
import Prelude hiding (lines)

-- | I'm aware this can be done in a more simple and performant manner using
--   arithmatic on Ints instead of the dial method used here. However, I was
--   having fun using cycles since they closely represent a dial.
solvePart2 :: Text -> String
solvePart2 input = show password
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
    clicksAdjusted = 100 - clicks
turn _ direction _ =
  error $
    "Invalid direction. Expecting 'L' or 'R'; got: " ++ [direction]

-- | ==== __Examples__
--   >>> followInstructions (0, startingDial) ["R55", "L5"]
--   (2,[0,1,2,3,4..])
followInstructions :: (Int, [Int]) -> [String] -> (Int, [Int])
followInstructions = foldl followInstruction

-- | ==== __Examples__
--   >>> followInstruction (0, startingDial) "R55"
--   (1,[5,6,7,8,9..])
--   >>> followInstruction (1, [5,6,7,8,9..]) "L5"
--   (2,[0,1,2,3,4..])
followInstruction :: (Int, [Int]) -> String -> (Int, [Int])
followInstruction (password, dial) (direction : clicks) = (password', dial')
  where
    dial' = turn dial direction clicks'
    password' =
      incrementPassword (password + fullRotations) direction dial dial'
    clicks' = read clicks `mod` 100
    fullRotations = read clicks `div` 100
followInstruction _ instruction =
  error $ "Instruction not long enough; got: " ++ instruction

-- ==== __Examples__
-- >>> incrementPassword 0 'R' startingDial [5,6,7,8..]
-- 1
-- >>> incrementPassword 1 'L' [5,6,7,8..] [0,1,2,3..]
-- 2
-- >>> incrementPassword 2 'R' [0,1,2,3..] [1,2,3,4..]
-- 2
-- >>> incrementPassword 3 'L' [1,2,3,4..] [99,0,1,2..]
-- 3
incrementPassword :: Int -> Char -> [Int] -> [Int] -> Int
incrementPassword password _ _ (0 : _otherNumbers) = password + 1 -- Landed on 0
incrementPassword password _ (0 : _otherNumbers) _ = password -- Started on 0
incrementPassword password 'R' (beforeNumber : _) (afterNumber : _)
  | afterNumber < beforeNumber = password + 1 -- Passed 0 going up
  | otherwise = password
incrementPassword password 'L' (beforeNumber : _) (afterNumber : _)
  | afterNumber > beforeNumber = password + 1 -- Passed 0 going down
  | otherwise = password
incrementPassword _ direction beforeDial afterDial =
  error $
    "Invalid input - either a dial array is not long enough or the"
      ++ "direction is unknown. Direction: "
      ++ show direction
      ++ "; Dial start: "
      ++ show (take 5 beforeDial)
      ++ "; Dial end: "
      ++ show (take 5 afterDial)
