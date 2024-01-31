import Data.ByteString.Char8 (split)
import Data.Text.Array (run)
import Text.Parsec (parse)

testInput = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"

main = do
  input <- readFile "testInput.dat"
  print (solvePart2 input)

solvePart2 puzzleInput = getTotalLensValue (convertBox (assembleBox (parseSteps puzzleInput)))

-- Parse Steps --

parseSteps = splitStringOn (== ',')

splitStringOn delimiter string = case dropWhile delimiter string of
  "" -> []
  string' -> element : splitStringOn delimiter string''
    where
      (element, string'') = break delimiter string'

-- Assemble Box --

assembleBox = foldl processStep []

processStep box step = if isStepARemoveStep step then removeLensFromBox box step else processLens box step

isStepARemoveStep step = length (splitStringOn (== '=') step) == 1

removeLensFromBox box lens = filter (\x -> getLabel x /= getLabel lens) box

processLens box lens = if checkIfBoxHasALensWithThisLabel box lens then replaceLensInBox box lens else addLensToBox box lens

checkIfBoxHasALensWithThisLabel box lens = any (\x -> getLabel x == getLabel lens) box

replaceLensInBox box lens = map (\x -> if getLabel lens == getLabel x then lens else x) box

addLensToBox box lens = box ++ [lens]

-- Convert Box --

-- Replace the box label of each string with its hashed value
convertBox = map (\x -> show (runHASHAlgorithm (getLabel x)) ++ drop 2 x)

getLabel step = head (splitStringOn (== '=') (filter (/= '-') step))

runHASHAlgorithm = foldl runHASHAlgorithmOnChar 0

runHASHAlgorithmOnChar currentValue nextCharacter = (currentValue + fromEnum nextCharacter) * 17 `mod` 256

getTotalLensValue box
  | null box = 0
  | doAllLensesHaveTheSameBoxNumber box = getTotalLensValueOfHomogeneousBox box
  -- otherwise remove all the lenses with labels that have the same label as the first lens, get their total lens value, and run getTotalLensValue recursively on the remaining lenses
  | otherwise = getTotalLensValueOfHomogeneousBox (filter (\x -> getBoxNumber x == getBoxNumber (head box)) box) + getTotalLensValue (filter (\x -> getBoxNumber x /= getBoxNumber (head box)) box)

-- Update this - currently we just treat each lens as having index 0
doAllLensesHaveTheSameBoxNumber box = all (\x -> getBoxNumber x == getBoxNumber (head box)) box

getBoxNumber lens = head (splitStringOn (== '=') (filter (/= '-') lens))

getLensValuesOfHomogeneousBox = map (\lens -> getFocusingPower lens (read (getBoxNumber lens)) 0)

getTotalLensValueOfHomogeneousBox box
  | null box = 0
  | length box == 1 = getFocusingPower (head box) (read (getBoxNumber (head box))) (length box)
  | otherwise = getFocusingPower (last box) (read (getBoxNumber (last box))) (length box) + getTotalLensValueOfHomogeneousBox (init box)

getFocusingPower lens boxNumber slotIndex = (boxNumber + 1) * read (getFocalLength lens) * slotIndex

getFocalLength step = splitStringOn (== '=') (filter (/= '-') step) !! 1
