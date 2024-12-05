module Types where

-- | (Before, After)
type Rule = (Int, Int)

type BeforeGroup = [Rule]

type RulesDict = [(Int, [Int])]

type Update = [Int]
