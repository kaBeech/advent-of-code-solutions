module Types where

type XYCoord = (Int, Int)

type Perimeter = Int

type Tile = (Char, XYCoord, Perimeter)

type GardenMap = [[Tile]]

type GardenFlatMap = [Tile]
