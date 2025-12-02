module Day1.Part2 (solvePart2) where

import Data.Text (Text, lines, unpack)
import Prelude hiding (lines)

solvePart2 :: Text -> String
solvePart2 input = show password
  where
    (password, _finalDial) = followInstructions (0, startingDial) instructions
    instructions = map unpack $ lines input

-- | The dial is an infinitely repeating list of numbers from 0 to 99.
--
--   At the beginning of the puzzle, the dial is set to 50; i.e. 50 is the
--   first number in the list.
--
--   In other words, startingDial is equivalent to [50, 51, 52, 53, 54, ... ]
--   (endlessly repeating).
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

followInstructions :: (Int, [Int]) -> [String] -> (Int, [Int])
followInstructions = foldl followInstruction

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
incrementPassword :: Int -> Char -> [Int] -> [Int] -> Int
incrementPassword password _ _ (0 : _otherNumbers) = password + 1
incrementPassword password _ (0 : _otherNumbers) _ = password
incrementPassword password 'R' (n : _) (n' : _)
  | n' < n = password + 1
  | otherwise = password
incrementPassword password 'L' (n : _) (n' : _)
  | n' > n = password + 1
  | otherwise = password
incrementPassword password _direction _dial _dial' = password
