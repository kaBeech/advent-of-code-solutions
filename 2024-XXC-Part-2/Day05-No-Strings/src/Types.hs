module Types where

-- | (Before, After)
type Rule = (Int, Int)

type BeforeGroup = [Rule]

type Trie = [BeforeGroup]

type Update = [Int]
