module OneLine
  ( solveParts,
  )
where

solveParts input = (solvePart1 input, solvePart2 input)

solvePart1 input =
  let parsedInput = map (\line -> (read (head (words (map (\c -> if c == ':' then ' ' else c) line))), map read (tail (words (map (\c -> if c == ':' then ' ' else c) line))))) (lines input)
      solvableEquations = filter (equationIsSolvable "*+") parsedInput
   in sum (map fst solvableEquations)

solvePart2 input =
  let parsedInput = map (\line -> (read (head (words (map (\c -> if c == ':' then ' ' else c) line))), map read (tail (words (map (\c -> if c == ':' then ' ' else c) line))))) (lines input)
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
      | o == '|' = acc xs os (read (show total ++ show x))
      | o == '+' = acc xs os (total + x)
      | o == '*' = acc xs os (total * x)
      | otherwise = error ("Invalid operator. Valid operators are: " ++ show operators ++ ". Got: " ++ [o])
