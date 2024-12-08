{-# OPTIONS_GHC -Wno-missing-signatures #-}

module OneLine
  ( solveParts,
  )
where

solveParts input = let split l = words (map (\c -> if c == ':' then ' ' else c) l); genOperators n validOps | n == 0 = [[op] | op <- validOps] | otherwise = [operator : rest | rest <- genOperators (n - 1) validOps, operator <- validOps]; tryEquation total (result : operands) operators | total == 0 = tryEquation (head operands) (result : tail operands) operators | null operands = total == result | otherwise = total <= result && (case head operators of '|' -> tryEquation (read (show total ++ show (head operands))) (result : tail operands) (tail operators); '+' -> tryEquation (total + head operands) (result : tail operands) (tail operators); _ -> tryEquation (total * head operands) (result : tail operands) (tail operators)); solve validOps = sum (map fst (filter (\equation -> any (tryEquation 0 (uncurry (:) equation)) (genOperators (length (snd equation) - 2) validOps)) (map (\line -> (read (head (split line)), map read (tail (split line)))) (lines input)))) in (solve "*+", solve "*+|")
