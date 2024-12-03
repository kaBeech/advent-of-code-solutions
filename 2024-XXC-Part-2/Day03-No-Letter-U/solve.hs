-- To make this work with no modvles,
-- do `cabal install --lib regex-tdfa split --package-env .` in this directory

import Data.List.Split
import Text.Regex.TDFA
import Text.Regex.TDFA.Text ()

main :: IO ()
main = do
  -- programMemory <- readFile "challenge.dat"
  programMemory <- readFile "test.dat"
  -- This may match "mtl(X,Y)" and "mvl(X,Y)" however I don't have those
  --    patterns in my programMemory. This may be solved with a second regex.
  let matches = getInsts programMemory
  print "Part 1: Adding the answers together yields: "
  print (calcProds matches)
  let dontSplits = splitOn "don't()" programMemory
  let start = head dontSplits
  let doBlocks = map getDoBlock (tail dontSplits)
  let doBlocksString = concat (start : doBlocks)
  let enabledMatches = getInsts doBlocksString
  print "Part 2: Adding the enabled answers together yields: "
  print (calcProds enabledMatches)

getInsts :: String -> [String]
getInsts s = getAllTextMatches (s =~ "m[t-v]l[(][0-9]{1,3},[0-9]{1,3}[)]") :: [String]

calcProds :: [String] -> Int
calcProds = acc 0
  where
    acc :: Int -> [String] -> Int
    acc total [] = total
    acc total (inst : insts) = acc (total + calcProd inst) insts

calcProd :: String -> Int
calcProd inst = do
  let x = read (inst =~ "[0-9]{1,3}" :: String) :: Int
  let y = read (drop 1 (inst =~ ",[0-9]{1,3}" :: String)) :: Int
  x * y

getDoBlock :: String -> String
getDoBlock s = do
  let (_, _, doBlock) = ((s =~ "do[(][)]") :: (String, String, String))
  doBlock
