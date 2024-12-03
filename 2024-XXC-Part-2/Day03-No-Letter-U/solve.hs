-- To make this work with no modvles,
-- do `cabal install --lib regex-tdfa --package-env .` in this directory
import Text.Regex.TDFA
import Text.Regex.TDFA.Text ()

main :: IO ()
main = do
  programMemory <- readFile "test.dat"
  print "Part 1: Adding the answers together yields: "
  print programMemory
  let matches = getAllTextMatches (programMemory =~ "[a-z]+") :: [String]
  print matches
