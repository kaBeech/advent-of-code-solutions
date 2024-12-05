module Parse
  ( parseInput,
  )
where

import Data.List.Split
import Types (Rule, Update)

-- | Takes a raw input string (including newlines) and returns rules and
--   updates as lists/tuples of integers.

-- | ==== __Examples__
--   >>> parseInput "47|53\n97|13\n97|61\n\n75,29,13\n75,97,47\n61,13,29"
--   ([(47,53),(97,13),(97,61)],[[75,29,13],[75,97,47],[61,13,29]])
parseInput :: [Char] -> ([Rule], [Update])
parseInput input =
  let [inputRules, inputUpdates] = splitOn ['\n', '\n'] input
      rules = map (\c -> if c == '|' then ' ' else c) inputRules
      updates = map (\c -> if c == ',' then ' ' else c) inputUpdates
      sanitizedRules = map ((\[before, after] -> (read before, read after)) . words) $ lines rules
      sanitizedUpdates = map (map read . words) $ lines updates
   in (sanitizedRules, sanitizedUpdates)
