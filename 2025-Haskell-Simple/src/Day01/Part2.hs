module Day01.Part2 (solvePart2) where

import Data.Text (Text, lines, unpack)
import Prelude hiding (lines)

solvePart2 :: Text -> String
solvePart2 input = show password
  where
    (password, _finalDial) =
      followInstructions (initPassword, startingDial) instructions
    instructions = map unpack $ lines input

-- | We will find the password using this code; our initial value for the
--   password is 0.
initPassword :: Int
initPassword = 0

-- | The dial is an infinitely repeating list of numbers from 0 to 99.
--
--   At the beginning of the puzzle, the dial is set to 50; i.e. 50 is the
--   first number in the list.
--
--   In other words, startingDial is equivalent to [50, 51, 52, 53, 54, ... ]
--   (endlessly repeating).
startingDial :: [Int]
startingDial = drop 50 $ cycle [0 .. 99]

-- | ==== __Examples__
--   >>> turn startingDial 'R' 5
--   [55,56,57,58,59..]
--   >>> turn startingDial 'L' 5
--   [45,46,47,48,49..]
--   >>> turn [0,1,2,3,4..] 'L' 1
--   [99,0,1,2,3..]
--   >>> turn [99,0,1,2,3..] 'R' 1
--   [0,1,2,3,4..]
--   >>> turn startingDial 'L' 68
--   [82,83,84,85,86..]
--   >>> turn [95,96,97,98,99..] 'R' 60
--   [55,56,57,58,59..]
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
--   >>> followInstructions (initPassword, startingDial) ["R55", "L5"]
--   (2,[0,1,2,3,4..])
followInstructions :: (Int, [Int]) -> [String] -> (Int, [Int])
followInstructions = foldl followInstruction

-- | ==== __Examples__
--   >>> followInstruction (initPassword, startingDial) "R55"
--   (1,[5,6,7,8,9..])
--   >>> followInstruction (1, [5,6,7,8,9..]) "L5"
--   (2,[0,1,2,3,4..])
--   >>> followInstruction (9, [5,6,7,8,9..]) "L300"
--   (12,[5,6,7,8,9..])
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

-- | Every time the dial hits or passes 0, increment the password by 1.
--
-- ==== __Examples__
-- >>> incrementPassword initPassword 'R' startingDial [5,6,7,8..]
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
incrementPassword password 'R' (n : _) (n' : _)
  | n' < n = password + 1 -- Passed 0 going up
  | otherwise = password
incrementPassword password 'L' (n : _) (n' : _)
  | n' > n = password + 1 -- Passed 0 going down
  | otherwise = password
incrementPassword _ direction dial dial' =
  error $
    "Invalid input - either a dial array is not long enough or the"
      ++ "direction is unknown. Direction: "
      ++ show direction
      ++ "; Dial start: "
      ++ show (take 5 dial)
      ++ "; Dial end: "
      ++ show (take 5 dial')
