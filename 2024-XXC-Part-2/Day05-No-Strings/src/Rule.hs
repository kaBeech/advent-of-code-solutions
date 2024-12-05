module Rule (mkDict) where

import Types (Rule, RulesDict)

mkDict :: [Rule] -> RulesDict
mkDict = acc []
  where
    acc :: RulesDict -> [Rule] -> RulesDict
    acc dict [] = dict
    acc dict ((before, after) : rules) = acc (insertRule dict before after) rules
