module OneLine
  ( solveParts,
  )
where

solveParts input = (solvePart input "*+", solvePart input "*+|")

solvePart input validOperators =
  let parsedInput = map (\line -> (read (head (words (map (\c -> if c == ':' then ' ' else c) line))), map read (tail (words (map (\c -> if c == ':' then ' ' else c) line))))) (lines input)
      solvableEquations = filter (equationIsSolvable validOperators) parsedInput
   in sum (map fst solvableEquations)

equationIsSolvable validOperators (result, operands) =
  let operators = genOperators validOperators operands
      tryEquation total equation operators = if total == 0 then tryEquation (head (tail equation)) ((head equation) : (tail (tail equation))) operators else if null (tail equation) then total == (head equation) else (total <= (head equation)) && (if (head operators) == '|' then tryEquation (read (show total ++ show (head (tail equation)))) ((head equation) : (tail (tail equation))) (tail operators) else if (head operators) == '+' then tryEquation (total + (head (tail equation))) ((head equation) : (tail (tail equation))) (tail operators) else tryEquation (total * (head (tail equation))) ((head equation) : (tail (tail equation))) (tail operators))
   in any (tryEquation 0 (result : operands)) operators

genOperators validOperators operands = acc (length operands - 2)
  where
    acc 0 = [[op] | op <- validOperators]
    acc n = do
      rest <- acc (n - 1)
      operator <- validOperators
      return (operator : rest)
