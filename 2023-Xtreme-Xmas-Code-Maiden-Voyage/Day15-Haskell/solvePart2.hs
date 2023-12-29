import Data.ByteString.Char8 (split)
import Data.Text.Array (run)

testInput = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"

main = do
  input <- readFile "testInput.dat"
  print (solvePart2 input)

solvePart2 puzzleInput = sum (getHASHedValues puzzleInput)

-- Parse Steps --

parseSteps = splitStringOn (== ',')

-- Assemble Box --

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

getFocusingPower lens slotIndex = (runHASHAlgorithm (getLabel lens) + 1) * read (getFocalLength lens) * (slotIndex + 1)

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