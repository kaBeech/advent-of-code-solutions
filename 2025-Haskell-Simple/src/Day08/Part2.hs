module Day08.Part2 (solvePart2) where

import Data.List (sort)
import Data.Map (Map, keys)
import qualified Data.Map as Map
import Data.Text (Text, lines)
import Util.Coordinates (XYZCoordinates, distanceXYZ)
import Util.Text (toXYZ)
import Prelude hiding (lines)

type JunctionBox = XYZCoordinates

type Circuit = [JunctionBox]

type CircuitMap = Map XYZCoordinates Circuit

type Connection = (Float, XYZCoordinates, XYZCoordinates)

type Connections = [Connection]

solvePart2 :: Text -> String
solvePart2 input =
  show $ x1 * x2
  where
    closestPairs' = sort $ closestPairs [] junctionBoxes
    junctionBoxes = map toXYZ $ lines input
    (_, (x1, _, _), (x2, _, _)) = newConnection
    (_, _, newConnection) =
      connectJunctionBoxes
        (length junctionBoxes)
        junctionBoxes
        (closestPairs', Map.empty, (0, (0, 0, 0), (0, 0, 0)))

connectJunctionBoxes ::
  Int ->
  [JunctionBox] ->
  (Connections, CircuitMap, Connection) ->
  (Connections, CircuitMap, Connection)
connectJunctionBoxes
  circuitSize
  junctionBoxes
  (connections, circuits, mostRecentConnection)
    | circuitSize <= length (concat (Map.elems circuits)) =
        (connections, circuits, mostRecentConnection)
    | otherwise =
        connectJunctionBoxes
          circuitSize
          junctionBoxes
          ( connectClosestJunctionBoxes (connections, circuits)
          )

closestPairs :: Connections -> [JunctionBox] -> Connections
closestPairs connections [] = connections
closestPairs connections [_] = connections
closestPairs connections (jb1 : rest) = closestPairs connections' rest
  where
    connections' = addPairs connections jb1 rest

addPairs :: Connections -> JunctionBox -> [JunctionBox] -> Connections
addPairs connections _ [] = connections
addPairs connections jb1 (jb2 : rest) =
  addPairs (newConnection : connections) jb1 rest
  where
    newDistance = distanceXYZ jb1 jb2
    newConnection = (newDistance, jb1, jb2)

connectClosestJunctionBoxes ::
  (Connections, CircuitMap) ->
  (Connections, CircuitMap, Connection)
connectClosestJunctionBoxes ([], _) = error "Out of connections!"
connectClosestJunctionBoxes
  (newConnection@(_, jb1, jb2) : connections, circuits) =
    (connections, circuits', newConnection)
    where
      circuits' =
        mergeCircuits circuits (keys jb1Key) (keys jb2Key) newConnection
      jb1Key = Map.filter (elem jb1) circuits
      jb2Key = Map.filter (elem jb2) circuits

mergeCircuits ::
  CircuitMap ->
  [XYZCoordinates] ->
  [XYZCoordinates] ->
  Connection ->
  CircuitMap
mergeCircuits allCircuits [key1] [key2] _ =
  Map.insertWith
    (++)
    key1
    (allCircuits Map.! key2)
    (Map.delete key2 allCircuits)
mergeCircuits allCircuits [] [key2] (_, jb1, _) =
  Map.insertWith (++) key2 [jb1] allCircuits
mergeCircuits allCircuits [key1] [] (_, _, jb2) =
  Map.insertWith (++) key1 [jb2] allCircuits
mergeCircuits allCircuits [] [] (_, jb1, jb2) =
  Map.insertWith (++) jb2 [jb1, jb2] allCircuits
mergeCircuits _ keys1 keys2 _ =
  error $
    "mergeCircuits: Expected 0 or 1 keys in each list, got "
      ++ show keys1
      ++ " and "
      ++ show keys2
