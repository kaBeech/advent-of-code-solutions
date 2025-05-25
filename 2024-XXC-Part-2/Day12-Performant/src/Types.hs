module Types where

type XYCoord = (Int, Int)

type Region = [Tile]

type Tile = (Char, XYCoord)

type GardenMap = [[Tile]]

type GardenFlatMap = [Tile]
