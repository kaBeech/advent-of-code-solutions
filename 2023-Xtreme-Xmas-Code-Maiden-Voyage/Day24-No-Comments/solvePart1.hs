main = do
  testInput <- readFile "testInput.dat"
  challengeInput <- readFile "challengeInput.dat"
  print (solvePart1 testInput)

solvePart1 puzzleInput = parseInput puzzleInput

-- Parse Steps --

parseInput = splitStringOn (== '\n') 

splitStringOn delimiter string = case dropWhile delimiter string of
  "" -> []
  string' -> element : splitStringOn delimiter string''
    where 
      (element, string'') = break delimiter string'
