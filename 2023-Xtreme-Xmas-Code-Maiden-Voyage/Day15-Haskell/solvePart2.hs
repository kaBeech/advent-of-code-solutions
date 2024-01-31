import Data.ByteString.Char8 (split)
import Data.Text.Array (run)
import Text.Parsec (parse)

testInput = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"

main = do
  input <- readFile "testInput.dat"
  print (solvePart2 input)

solvePart2 puzzleInput = do
  box <- convertBox (assembleBox (parseSteps puzzleInput))
  -- focusingPowerValues <- map (getFocusingPower box) [0 .. length box - 1]
  -- return (sum focusingPowerValues)
  return box

-- solvePart2 puzzleInput = sum (map getFocusingPower (assembleBox (parseSteps puzzleInput)))

-- clean this up!
getLensValues box =
  if (doAllLensesHaveTheSameBoxNumber box)
    then -- Update this - currently we just treat each lense as having index 1
      return getTotalLensValueOfHomogeneousBox box
    else -- else remove all the lenses with labels that have the same hash value as the first lens, and put them in a new box.
    -- return (getLensValues (filter (\x -> getBoxNumber x /= getBoxNumber head box) box))
    -- return (filter (\x -> getBoxNumber x /= getBoxNumber (head box)) box)
      return getTotalLensValueOfHomogeneousBox (filter (\x -> getBoxNumber x /= getBoxNumber (head box)) box)

-- then return (recursiveFunction theNewBox) + recursiveFunction theBoxWithTheLeftoverLenses)

getTotalLensValueOfHomogeneousBox box = sum (map (\lens -> getFocusingPower lens (read (getBoxNumber lens)) 1) box)

doAllLensesHaveTheSameBoxNumber :: [[Char]] -> Bool
doAllLensesHaveTheSameBoxNumber box = all (\x -> getBoxNumber x == getBoxNumber (head box)) box

-- getTotalLensValueOfHomogeneousBox box = sum (map (getFocusingPower boxNumber lens slotIndex) [0 .. length box - 1])

getBoxNumber lens = splitStringOn (== '=') (filter (/= '-') lens) !! 1

-- end cleanup

-- Parse Steps --

parseSteps = splitStringOn (== ',')

-- Assemble Box --

-- Replace the box label of each string with its hashed value
convertBox box = map (\x -> show (runHASHAlgorithm (getLabel x)) ++ drop 2 x) box

assembleBox steps = foldl processStep [] steps

processStep box step = if isStepARemoveStep step then removeLensFromBox box step else processLens box step

isStepARemoveStep step = length (splitStringOn (== '=') step) == 1

removeLensFromBox box lens = filter (\x -> getLabel x /= getLabel lens) box

getLabel step = head (splitStringOn (== '=') (filter (/= '-') step))

processLens box lens = if checkIfBoxHasALensWithThisLabel box lens then replaceLensInBox box lens else addLensToBox box lens

checkIfBoxHasALensWithThisLabel box lens = any (\x -> getLabel x == getLabel lens) box

replaceLensInBox box lens = map (\x -> if getLabel lens == getLabel x then lens else x) box

addLensToBox box lens = box ++ [lens]

-- Get Focusing Power --

getFocusingPower lens boxNumber slotIndex = (boxNumber + 1) * read (getFocalLength lens) * (slotIndex + 1)

getFocalLength step = splitStringOn (== '=') (filter (/= '-') step) !! 1

-- HASH Algorithm --

getHASHedValues puzzleInput = map runHASHAlgorithm (splitStringOn (== ',') puzzleInput)

runHASHAlgorithm hashString = foldl runHASHAlgorithmOnChar 0 hashString

runHASHAlgorithmOnChar currentValue nextCharacter = (currentValue + fromEnum nextCharacter) * 17 `mod` 256

splitStringOn delimiter string = case dropWhile delimiter string of
  "" -> []
  string' -> element : splitStringOn delimiter string''
    where
      (element, string'') = break delimiter string'