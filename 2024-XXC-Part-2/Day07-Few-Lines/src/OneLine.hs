module OneLine
  ( solvePart1,
    solvePart2,
  )
where

type Equation = (Int, [Int])

-- | Takes a string representation of a list of equations and returns the
--   sum of the results of the equations.

-- | ==== __Examples__
--   >>> solvePart1 "190: 10 19\n83: 17 5\n156: 15 6"
--   190
solvePart1 :: String -> Int
solvePart1 input =
  let parsedInput = parseInput input
      solvableEquations = filter (equationIsSolvable "*+") parsedInput
   in sum (map fst solvableEquations)

-- | Takes a string representation of a list of equations and returns the
--   sum of the results of the equations.

-- | ==== __Examples__
--   >>> solvePart2 "190: 10 19\n83: 17 5\n156: 15 6"
--   346
solvePart2 :: String -> Int
solvePart2 input =
  let parsedInput = parseInput input
      solvableEquations = filter (equationIsSolvable "*+|") parsedInput
   in sum (map fst solvableEquations)

-- | Takes an equation and returns whether it can be solved.

-- | ==== __Examples__
--   >>> equationIsSolvable "*+" (190, [10, 19])
--   True
--
--   >>> equationIsSolvable "*+" (83, [17, 5])
--   False
--
--   >>> equationIsSolvable "*+" (156, [15, 6])
--   False
--
--   >>> equationIsSolvable "*+|" (156, [15, 6])
--   True
equationIsSolvable :: [Char] -> Equation -> Bool
equationIsSolvable validOperators (result, operands) =
  let operators = genOperators validOperators operands
   in any (tryEquation (result, operands)) operators

-- | Takes a list of valid operators and a list of operands and returns a list
--   of all possible combinations of operators that can be inserted between them.

-- | ==== __Examples__
--   >>> genOperators "*+" [1, 2, 3]
--   ["**","+*","*+","++"]
genOperators :: [Char] -> [Int] -> [[Char]]
genOperators validOperators operands = acc (length operands - 2)
  where
    acc 0 = [[op] | op <- validOperators]
    acc n = do
      rest <- acc (n - 1)
      operator <- validOperators
      return (operator : rest)

-- | Takes an equation and a list of operators and returns whether the equation
--   can be solved with the given operators.

-- | ==== __Examples__
--   >>> tryEquation (190, [190]) ""
--   True
--
--   >>> tryEquation (190, [10, 19]) "*"
--   True
--
--   >>> tryEquation (29, [10, 19]) "+"
--   True
--
--   >>> tryEquation (190, [10, 19]) "+"
--   False
--
--   >>> tryEquation (156, [15, 6]) "|"
--   True
tryEquation :: Equation -> [Char] -> Bool
tryEquation (_, []) _ = error "No operands provided."
tryEquation (result, firstX : operands) operators = acc operands operators firstX
  where
    acc [] _ total = total == result
    acc _ [] total = total == result
    acc (x : xs) (o : os) total
      | total > result = False
      | o == '|' = acc xs os (concatInt [total, x])
      | o == '+' = acc xs os (total + x)
      | o == '*' = acc xs os (total * x)
      | otherwise = error ("Invalid operator. Valid operators are: " ++ show operators ++ ". Got: " ++ [o])

concatInt :: [Int] -> Int
concatInt = read . concatMap show

-- | Takes a raw string input and returns a list of equations.

-- | ==== __Examples__
--   >>> parseInput "190: 10 19\n83: 17 5"
--   [(190,[10,19]),(83,[17,5])]
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
