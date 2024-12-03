-- To make this work with no modvles,
-- do `cabal install --lib regex-tdfa --package-env .` in this directory
import Text.Regex.TDFA
import Text.Regex.TDFA.Text ()

main :: IO ()
main = do
  -- programMemory <- readFile "challenge.dat"
  rawProgramMemory <- readFile "test.dat"
  -- Concatenate lines in the in file
  let programMemory = filter (/= '\n') rawProgramMemory
  -- This may match "mtl(X,Y)" and "mvl(X,Y)" however I don't have those
  --    patterns in my programMemory. This may be solved with a second regex.
  let matches = getAllTextMatches (programMemory =~ "m[t-v]l[(][0-9]{1,3},[0-9]{1,3}[)]") :: [String]
  let total = calcProds matches
  print "Part 1: Adding the answers together yields: "
  print total
  let (start, _, _) = programMemory =~ "don't[(][)]" :: (String, String, String)
  print start
  let middle = getAllTextMatches (programMemory =~ "do[(][)].+don't[(][)]") :: [String]
  print middle

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
