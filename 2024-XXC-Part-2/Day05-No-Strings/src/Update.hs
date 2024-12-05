module Update (getOrderedUpdates, sumMiddlePages) where

import Types (RulesDict, Update)

getOrderedUpdates :: RulesDict -> [Update] -> [Update]
getOrderedUpdates rulesDict = filter (checkIfUpdateIsOrdered rulesDict)

checkIfUpdateIsOrdered :: RulesDict -> Update -> Bool
checkIfUpdateIsOrdered _ [] = True
checkIfUpdateIsOrdered rulesDict (x : xs) = case lookup x rulesDict of
  Nothing -> checkIfUpdateIsOrdered rulesDict xs
  Just befores -> not (any (`elem` befores) xs) && checkIfUpdateIsOrdered rulesDict xs
