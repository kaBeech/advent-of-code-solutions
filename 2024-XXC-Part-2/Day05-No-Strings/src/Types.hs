module Types where

-- | (Before, After)
type Rule = (Int, Int)

-- | (After, Befores)
type RulesDict = [(Int, [Int])]

type Update = [Int]
