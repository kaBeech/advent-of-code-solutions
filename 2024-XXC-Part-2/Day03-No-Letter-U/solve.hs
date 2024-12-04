-- \| To make this work with no modvles,
--   do `cabal install --lib regex-tdfa split --package-env .` in this directory

import Data.List.Split
import Text.Regex.TDFA
import Text.Regex.TDFA.Text ()

main :: IO ()
main = do
  -- programMemory <- readFile "challenge.dat"
  programMemory <- readFile "test.dat"
  let matches = getInstns programMemory
  print "Part 1: Adding the answers together yields: "
  print (addProds matches)
  let dontSplits = splitOn "don't()" programMemory
  let start = head dontSplits -- The program starts enabled
  let dontBlocks = tail dontSplits -- `don't()` commands disable instns
  let doBlocks = map getDoBlock dontBlocks -- `do()` commands re-enable instns
  let instnString = concat (start : doBlocks)
  let enabledMatches = getInstns instnString
  print "Part 2: Adding the enabled answers together yields: "
  print (addProds enabledMatches)

-- | Get matches of "mxl(X,Y)" where 'x' is the letter that cannot be named in
--   this file and 'X' and 'Y' are both 1- to 3-digit Integers.
--   This may match "mtl(X,Y)" and "mvl(X,Y)" however I don't have those
--   patterns in my programMemory. This may be solved with another regex, or
--   with lookaheads if those are available (I didn't know how do to them
--   in tdfa - something like /m(?=[^t])(?=[^v])[t-v]l/ may work instead
--   of /m[t-v]l/)
getInstns :: String -> [String]
getInstns s = getAllTextMatches (s =~ "m[t-v]l[(][0-9]{1,3},[0-9]{1,3}[)]") :: [String]

-- | Get the total of adding the prods from all instns
addProds :: [String] -> Int
addProds = acc 0
  where
    acc :: Int -> [String] -> Int
    acc total [] = total
    acc total (instn : instns) = acc (total + calcProd instn) instns

-- | Get the Ints from the instn and times them by each other
calcProd :: String -> Int
calcProd instn = do
  let x = read (instn =~ "[0-9]{1,3}" :: String) :: Int
  let y = read (drop 1 (instn =~ ",[0-9]{1,3}" :: String)) :: Int
  x * y

-- | Get all instns that follow the first `do()` command in the given string.
--   This is meant for stripping the disabled instns from the start of a string
--   that begins with a `don't()` command (i.e. a dontBlock)
getDoBlock :: String -> String
getDoBlock s = do
  -- This splits the string at the first `do()` command, assigning everything
  -- that comes after that command to `doBlock`
  let (_, _, doBlock) = ((s =~ "do[(][)]") :: (String, String, String))
  doBlock
