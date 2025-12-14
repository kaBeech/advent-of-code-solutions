module Day08.Part1 (solvePart1) where

import Data.Function (on)
import Data.List (minimumBy, sortBy)
import Data.Map (Map)
import qualified Data.Map as Map
import Data.Text (Text, lines)
import Util.Coordinates (XYZCoordinates, distanceXYZ)
import Util.Text (toXYZ)
import Util.Tuple (sort)
import Prelude hiding (lines)

infinity :: Float
infinity = fromIntegral (maxBound :: Int)

sortByLength :: [[a]] -> [[a]]
sortByLength = sortBy (flip compare `on` length)

type JunctionBox = XYZCoordinates

type Circuit = [JunctionBox]

type CircuitMap = Map XYZCoordinates Circuit

type Connections = [(XYZCoordinates, XYZCoordinates)]

solvePart1 :: Text -> String
solvePart1 input =
  show $ product $ take 3 $ map length $ sortByLength $ Map.elems circuitMap
  where
    junctionBoxes = map toXYZ $ lines input
    (_, circuitMap) =
      iterate (connectClosestJunctionBoxes junctionBoxes) ([], Map.empty) !! 1000

connectClosestJunctionBoxes ::
  [JunctionBox] -> (Connections, CircuitMap) -> (Connections, CircuitMap)
connectClosestJunctionBoxes junctionBoxes (connections, circuits) =
  (newConnection : connections, circuits')
  where
    circuits' =
      mergeCircuits circuits (Map.keys jb1Key) (Map.keys jb2Key) newConnection
    jb1Key = Map.filter (elem jb1) circuits
    jb2Key = Map.filter (elem jb2) circuits
    newConnection@(jb1, jb2) = sort $ closestJunctionBoxes ((0, 0, 0), (0, 0, 0)) junctionBoxes infinity connections junctionBoxes

mergeCircuits ::
  CircuitMap ->
  [XYZCoordinates] ->
  [XYZCoordinates] ->
  (JunctionBox, JunctionBox) ->
  CircuitMap
mergeCircuits allCircuits [key1] [key2] _ =
  Map.insertWith
    (++)
    key1
    (allCircuits Map.! key2)
    (Map.delete key2 allCircuits)
mergeCircuits allCircuits [] [key2] (jb1, _) =
  Map.insertWith (++) key2 [jb1] allCircuits
mergeCircuits allCircuits [key1] [] (_, jb2) =
  Map.insertWith (++) key1 [jb2] allCircuits
mergeCircuits allCircuits [] [] (jb1, jb2) =
  Map.insertWith (++) jb2 [jb1, jb2] allCircuits
mergeCircuits _ keys1 keys2 _ =
  error $
    "mergeCircuits: Expected 0 or 1 keys in each list, got "
      ++ show keys1
      ++ " and "
      ++ show keys2

closestJunctionBoxes :: (JunctionBox, JunctionBox) -> [JunctionBox] -> Float -> Connections -> Circuit -> (JunctionBox, JunctionBox)
closestJunctionBoxes closestPair [] _ _ _ = closestPair
closestJunctionBoxes closestPair [jb] _ _ _ = closestPair
closestJunctionBoxes closestPair (jb : rest) closestDistance connections allJunctionBoxes
  | closestDistance' < closestDistance = closestJunctionBoxes (jb, jb') rest closestDistance' ((jb, jb') : connections) allJunctionBoxes
  | otherwise = closestJunctionBoxes closestPair rest closestDistance connections allJunctionBoxes
  where
    (jb', closestDistance') = closestJunctionBox jb closestDistance connections rest

closestJunctionBox :: JunctionBox -> Float -> Connections -> [JunctionBox] -> (JunctionBox, Float)
closestJunctionBox jb closestDistance connections rest = (closestJb, closestDistance')
  where
    closestJb = minimumBy (compare `on` distance closestDistance connections jb) rest
    closestDistance' = distance closestDistance connections jb closestJb

distance :: Float -> Connections -> JunctionBox -> JunctionBox -> Float
distance closestDistance connections jb1@(x1, y1, z1) jb2@(x2, y2, z2)
  | absDiff x1 x2 > closestDistance = infinity
  | absDiff y1 y2 > closestDistance = infinity
  | absDiff z1 z2 > closestDistance = infinity
  | jb1 == jb2 = infinity
  | sort (jb1, jb2) `elem` connections = infinity
  | otherwise = distanceXYZ jb1 jb2
  where
    absDiff a b = fromIntegral $ abs (a - b)
