module MultiLine
  ( solvePart1,
  )
where

type Equation = (Int, [Int])

-- | Takes a string representation of a list of equations and returns the
--   number of solvable equations.

-- | ==== __Examples__
--   >>> solvePart1 "190: 10 19\n83: 17 5"
--   1
solvePart1 :: String -> Int
solvePart1 input =
  let parsedInput = parseInput input
      solvableEquations = filter equationIsSolvable parsedInput
   in length solvableEquations

-- | TODO: This is a stub. Implement this function.
equationIsSolvable :: Equation -> Bool
equationIsSolvable (result, operands) = tryEquation (result, operands) "+*"

tryEquation :: Equation -> [Char] -> Bool
tryEquation (result, operands) operators =
  let operatorsValid = all (`elem` "+*") operators || error ("Invalid operator in list. Got: " ++ show operators)
      lengthsMatch = length operands == length operators - 1
      valid = operatorsValid && lengthsMatch
   in if valid then acc operands operators 0 else error "See errors above."
  where
    acc [] _ total = total == result
    acc _ [] total = total == result
    acc (x : xs) (o : os) total
      | total > result = False
      | o == '+' = acc xs os (total + x)
      | otherwise = acc xs os (total * x)

-- | Takes a raw string input and returns a list of equations.

-- | ==== __Examples__
--   >>> parseInput "190: 10 19\n83: 17 5"
--   [[(190,[10,19])],[(83,[17,5])]]
parseInput :: String -> [Equation]
parseInput input = map parseLine (lines input)

-- | Takes a string and parses it into an equation.
--
-- | ==== __Examples__
--   >>> parseLine "190: 10 19"
--   (190,[10,19])
parseLine :: String -> Equation
parseLine line = (read (head split), map read (tail split))
  where
    split = words (map (\c -> if c == ':' then ' ' else c) line)
