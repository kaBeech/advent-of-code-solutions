module Util.Tuple (pairUp) where

pairUp :: (Show a) => [a] -> [(a, a)]
pairUp [firstElem, secondElem] = [(firstElem, secondElem)]
pairUp (firstElem : secondElem : rest) = (firstElem, secondElem) : pairUp rest
pairUp elems =
  error $ "Expected a list of at least 2 items; got: " ++ show elems
