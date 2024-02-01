main = do
  input <- readFile "challengeInput.dat"
  print (solvePart1 input)

solvePart1 puzzleInput = sum (getHASHedValues puzzleInput)

getHASHedValues puzzleInput = map runHASHAlgorithm (splitStringOn (== ',') puzzleInput)

runHASHAlgorithm = foldl runHASHAlgorithmOnChar 0

runHASHAlgorithmOnChar currentValue nextCharacter = (currentValue + fromEnum nextCharacter) * 17 `mod` 256

splitStringOn delimiter string = case dropWhile delimiter string of
  "" -> []
  string' -> element : splitStringOn delimiter string''
    where
      (element, string'') = break delimiter string'