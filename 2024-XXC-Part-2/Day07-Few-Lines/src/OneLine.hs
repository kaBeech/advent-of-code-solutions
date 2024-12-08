module OneLine
  ( solvePart1,
    solvePart2,
  )
where

solvePart1 input =
  let parsedInput = parseInput input
      solvableEquations = filter (equationIsSolvable "*+") parsedInput
   in sum (map fst solvableEquations)

solvePart2 input =
  let parsedInput = parseInput input
      solvableEquations = filter (equationIsSolvable "*+|") parsedInput
   in sum (map fst solvableEquations)

equationIsSolvable validOperators (result, operands) =
  let operators = genOperators validOperators operands
   in any (tryEquation (result, operands)) operators

genOperators validOperators operands = acc (length operands - 2)
  where
    acc 0 = [[op] | op <- validOperators]
    acc n = do
      rest <- acc (n - 1)
      operator <- validOperators
      return (operator : rest)

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

concatInt = read . concatMap show

parseInput input = map parseLine (lines input)

parseLine line = (read (head split), map read (tail split))
  where
    split = words (map (\c -> if c == ':' then ' ' else c) line)
