module Parse
  ( parseInput,
  )
where

import Types (Rule, Update)

-- | Takes inputRules and inputUpdates as raw strings (including newlines) and
--   returns rules and updates as lists/tuples of integers.

-- | ==== __Examples__
--   >>> parseInput "47 53\n97 13\n97 61" "75 29 13\n75 97 47\n61 13 29"
--   ([(47,53),(97,13),(97,61)],[[75,29,13],[75,97,47],[61,13,29]])
parseInput :: String -> String -> ([Rule], [Update])
parseInput inputRules inputUpdates =
  let updates = map (map read . words) $ lines inputUpdates
      rules = map ((\[a, b] -> (read a, read b)) . words) $ lines inputRules
   in (rules, updates)
