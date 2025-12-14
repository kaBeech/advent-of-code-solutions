module Util.Coordinates
  ( Coordinates,
    XYCoordinates,
    XYZCoordinates,
    distance,
    fromXY,
    toXY,
    distanceXY,
    fromXYZ,
    toXYZ,
    distanceXYZ,
  )
where

import Data.Function (on)

differenceSquared :: Int -> Int -> Float
differenceSquared a b = fromIntegral (a - b) ** 2

type Coordinates = [Int]

distance :: Coordinates -> Coordinates -> Float
distance coords1 coords2 =
  sqrt $ sum $ zipWith differenceSquared coords1 coords2

type XYCoordinates = (Int, Int)

toXY :: Coordinates -> XYCoordinates
toXY (x : y : _rest) = (x, y)
toXY coordinates =
  error $
    "Expecting a list of at least two coordinates; got: " ++ show coordinates

fromXY :: XYCoordinates -> Coordinates
fromXY (x, y) = [x, y]

distanceXY :: XYCoordinates -> XYCoordinates -> Float
distanceXY = distance `on` fromXY

type XYZCoordinates = (Int, Int, Int)

toXYZ :: Coordinates -> XYZCoordinates
toXYZ (x : y : z : _rest) = (x, y, z)
toXYZ coordinates =
  error $
    "Expecting a list of at least three coordinates; got: " ++ show coordinates

fromXYZ :: XYZCoordinates -> Coordinates
fromXYZ (x, y, z) = [x, y, z]

distanceXYZ :: XYZCoordinates -> XYZCoordinates -> Float
distanceXYZ = distance `on` fromXYZ
