runHASHAlgorithmOnChar currentValue nextCharacter = (currentValue + fromEnum nextCharacter) * 17 `mod` 256

exampleHASHString = "HASH"

testHASHAlgorithm startingValue = foldl runHASHAlgorithmOnChar 0 exampleHASHString

splitStringOn delimiter string = case dropWhile delimiter string of
  "" -> []
  string' -> element : splitStringOn delimiter string''
    where
      (element, string'') = break delimiter string'