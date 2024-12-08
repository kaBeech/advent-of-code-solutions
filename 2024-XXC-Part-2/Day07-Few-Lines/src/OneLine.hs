module OneLine
  ( solveParts,
  )
where

-- solveParts input = (solvePart input "*+", solvePart input "*+|")
solveParts input = (solvePart input, solvePart input)

solvePart input = sum (map fst (filter (equationIsSolvable) (map (\line -> (read (head (words (map (\c -> if c == ':' then ' ' else c) line))), map read (tail (words (map (\c -> if c == ':' then ' ' else c) line))))) (lines input))))

equationIsSolvable (result, operands) =
  let tryEquation total equation operators = if total == 0 then tryEquation (head (tail equation)) ((head equation) : (tail (tail equation))) operators else if null (tail equation) then total == (head equation) else (total <= (head equation)) && (if (head operators) == '|' then tryEquation (read (show total ++ show (head (tail equation)))) ((head equation) : (tail (tail equation))) (tail operators) else if (head operators) == '+' then tryEquation (total + (head (tail equation))) ((head equation) : (tail (tail equation))) (tail operators) else tryEquation (total * (head (tail equation))) ((head equation) : (tail (tail equation))) (tail operators))
      genOperators n = if n == 0 then [[op] | op <- "*+|"] else [(operator : rest) | rest <- genOperators (n - 1), operator <- "*+|"]
   in any (tryEquation 0 (result : operands)) (genOperators (length operands - 2))
