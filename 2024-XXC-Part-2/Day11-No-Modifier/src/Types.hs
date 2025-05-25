module Types where

type Memo f = f -> f

type XYCoord = (Int, Int)

type Tile = (Char, XYCoord)

type CharMap = [[Tile]]

type CharFlatMap = [Tile]

-- (Engraved number, blinks remaining)
type Stone = (String, Int)
