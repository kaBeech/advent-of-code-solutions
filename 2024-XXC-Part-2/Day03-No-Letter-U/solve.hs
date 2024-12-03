-- To make this work with no modvles,
-- do `cabal install --lib regex-tdfa --package-env .` in this directory
import Text.Regex.TDFA
import Text.Regex.TDFA.Text ()

main :: IO ()
main = do
  programMemory <- readFile "test.dat"
  print "Part 1: Adding the answers together yields: "
  print programMemory
  -- This may match "mtl..." and "mvl..." however I don't have those patterns in
  --    my programMemory. This may be solved with a second regex.
  let matches = getAllTextMatches (programMemory =~ "m[t-v]l[(][0-9]{1,3},[0-9]{1,3}[)]") :: [String]
  print matches
