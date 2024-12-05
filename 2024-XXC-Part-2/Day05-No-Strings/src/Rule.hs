module Rule (mkDict) where

import Types (Rule, RulesDict)

mkDict :: [Rule] -> RulesDict
mkDict = acc []
  where
    acc :: RulesDict -> [Rule] -> RulesDict
    acc dict [] = dict
    acc dict ((before, after) : rules) = acc (insertRule dict before after) rules

insertRule :: RulesDict -> Int -> Int -> RulesDict
insertRule dict before after = case lookup after dict of
  Nothing -> (after, [before]) : dict
  Just befores -> (after, before : befores) : filter ((/= after) . fst) dict
