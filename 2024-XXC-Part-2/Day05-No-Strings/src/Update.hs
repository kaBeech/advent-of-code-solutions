module Update (getOrderedUpdates, getUnorderedUpdates, sortUpdate, sumMiddlePages) where

import Types (RulesDict, Update)

getOrderedUpdates :: RulesDict -> [Update] -> [Update]
getOrderedUpdates rulesDict = filter (checkIfUpdateIsOrdered rulesDict)

getUnorderedUpdates :: RulesDict -> [Update] -> [Update]
getUnorderedUpdates rulesDict = filter (not . checkIfUpdateIsOrdered rulesDict)

checkIfUpdateIsOrdered :: RulesDict -> Update -> Bool
checkIfUpdateIsOrdered _ [] = True
checkIfUpdateIsOrdered rulesDict (page : pages) = case lookup page rulesDict of
  Nothing -> checkIfUpdateIsOrdered rulesDict pages
  Just befores -> not (any (`elem` befores) pages) && checkIfUpdateIsOrdered rulesDict pages

sortUpdate :: RulesDict -> Update -> Update
sortUpdate = acc []
  where
    acc :: [Int] -> RulesDict -> Update -> Update
    acc acced rulesDict [] = if checkIfUpdateIsOrdered acced
                               then acced
                               else sortUpdate acced
    acc acced rulesDict (page : pages) = case lookup page rulesDict of
      Nothing -> acc (page : acced) rulesDict pages
      Just befores ->
        let unsortedPagesBefore = filter (`elem` befores) pages
            unsortedPagesOther = filter (not . (`elem` befores)) pages
            sortedPagesBefore = filter (`elem` befores) acced
            sortedPagesOther = filter (not . (`elem` befores)) acced
         in if null unsortedPagesBefore
              then acc (sortedPagesBefore ++ [page] ++ sortedPagesOther) rulesDict pages
              else acc acced rulesDict (unsortedPagesBefore ++ [page] ++ unsortedPagesOther)

sumMiddlePages :: [Update] -> Int
sumMiddlePages = sum . map getMiddlePage

getMiddlePage :: Update -> Int
getMiddlePage update = update !! (length update `div` 2)
