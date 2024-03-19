
import Data.ByteString.Char8 (split)
import Data.Text.Array (run)
import Text.Parsec (parse)

testInput = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"

main = do
  input <- readFile "testInput1.dat"
  print (solvePart1 input)

solvePart1 = parseSteps

-- Parse Steps --

parseSteps = splitStringOn (== '\n')

splitStringOn delimiter string = case dropWhile delimiter string of
  "" -> []
  string' -> element : splitStringOn delimiter string''
    where
      (element, string'') = break delimiter string'
