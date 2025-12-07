module Util.Coordinates (Coordinates, XYCoordinates, toXY) where

type Coordinates = [Int]

type XYCoordinates = (Int, Int)

toXY :: Coordinates -> XYCoordinates
toXY (x : y : _rest) = (x, y)
toXY coordinates =
  error $
    "Expecting a list of at least two coordinates; got: " ++ show coordinates
