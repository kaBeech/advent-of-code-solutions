module Update (getOrderedUpdates, sumMiddlePages) where

import Types (RulesDict, Update)

getOrderedUpdates :: RulesDict -> [Update] -> [Update]
getOrderedUpdates rulesDict = filter (checkIfUpdateIsOrdered rulesDict)

checkIfUpdateIsOrdered :: RulesDict -> Update -> Bool
checkIfUpdateIsOrdered _ [] = True
checkIfUpdateIsOrdered rulesDict (update : updates) = case lookup update rulesDict of
  Nothing -> checkIfUpdateIsOrdered rulesDict updates
  Just befores -> not (any (`elem` befores) updates) && checkIfUpdateIsOrdered rulesDict updates

sumMiddlePages :: [Update] -> Int
sumMiddlePages = sum . map getMiddlePage

getMiddlePage :: Update -> Int
getMiddlePage update = update !! (length update `div` 2)
