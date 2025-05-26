module Types where

data Spec = Spec {a :: XYCoord, b :: XYCoord, prize :: XYCoord}

type XYCoord = (Int, Int)
