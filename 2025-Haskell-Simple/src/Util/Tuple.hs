module Util.Tuple (mapT, pairUp) where

mapT :: (t -> b) -> (t, t) -> (b, b)
mapT f (a, b) = (f a, f b)

pairUp :: (Show a) => [a] -> [(a, a)]
pairUp [first, second] = [(first, second)]
pairUp (first : second : rest) = (first, second) : pairUp rest
pairUp elems =
  error $ "Expected a list of at least 2 items; got: " ++ show elems
