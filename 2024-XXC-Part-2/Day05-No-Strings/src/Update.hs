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
    acc sorted rulesDict [] =
      if checkIfUpdateIsOrdered rulesDict sorted
        then sorted
        else sortUpdate rulesDict sorted
    acc sorted rulesDict (page : unsorted) = case lookup page rulesDict of
      Nothing -> acc (page : sorted) rulesDict unsorted
      Just befores ->
        let unsortedPagesBefore = filter (`elem` befores) unsorted
            unsortedPagesOther = filter (not . (`elem` befores)) unsorted
            sortedPagesBefore = filter (`elem` befores) sorted
            sortedPagesOther = filter (not . (`elem` befores)) sorted
         in if null unsortedPagesBefore
              then acc (sortedPagesBefore ++ [page] ++ sortedPagesOther) rulesDict unsorted
              else acc sorted rulesDict (unsortedPagesBefore ++ [page] ++ unsortedPagesOther)

sumMiddlePages :: [Update] -> Int
sumMiddlePages = sum . map getMiddlePage

getMiddlePage :: Update -> Int
getMiddlePage update = update !! (length update `div` 2)
