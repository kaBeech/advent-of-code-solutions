testInput = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"

main = do
  input <- readFile "testInput.dat"
  print (solvePart2 input)

parseSteps = splitStringOn (== ',')

getLabel step = head (splitStringOn (== '=') (filter (/= '-') step))

-- parseStep step = splitStringOn (== '=') (filter (/= '-') step)

-- parseSteps puzzleInput = map parseStep (splitStringOn (== ',') puzzleInput)

-- boxesSeen = "qp"
-- boxLenses = []

-- parsedSteps = parseSteps testInput
-- for (const step of parsedSteps) { if (!boxesSeen.contains(step[0])) { boxesSeen.push(step); if (step.length > 1) { boxLenses.push(step) } } }
-- filterSteps remainingSteps boxesSeen = filter (\x -> head x == boxesSeen) remainingSteps

--

addLensToBox box lens = box ++ [lens]

checkIfBoxHasALensWithThisLabel box lens = any (\x -> getLabel x == getLabel lens) box

replaceLensInBox box lens = map (\x -> if getLabel lens == getLabel x then lens else x) box

solvePart2 puzzleInput = sum (getHASHedValues puzzleInput)

getHASHedValues puzzleInput = map runHASHAlgorithm (splitStringOn (== ',') puzzleInput)

runHASHAlgorithm hashString = foldl runHASHAlgorithmOnChar 0 hashString

runHASHAlgorithmOnChar currentValue nextCharacter = (currentValue + fromEnum nextCharacter) * 17 `mod` 256

splitStringOn delimiter string = case dropWhile delimiter string of
  "" -> []
  string' -> element : splitStringOn delimiter string''
    where
      (element, string'') = break delimiter string'