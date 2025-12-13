module Util.Coordinates
  ( Coordinates,
    XYCoordinates,
    XYZCoordinates,
    toXY,
    toXYZ,
  )
where

type Coordinates = [Int]

type XYCoordinates = (Int, Int)

toXY :: Coordinates -> XYCoordinates
toXY (x : y : _rest) = (x, y)
toXY coordinates =
  error $
    "Expecting a list of at least two coordinates; got: " ++ show coordinates

type XYZCoordinates = (Int, Int, Int)

toXYZ :: Coordinates -> XYZCoordinates
toXYZ (x : y : z : _rest) = (x, y, z)
toXYZ coordinates =
  error $
    "Expecting a list of at least three coordinates; got: " ++ show coordinates
