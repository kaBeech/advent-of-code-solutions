main :: IO ()
main = do
  programMemory <- readFile "test.dat"
  print "Part 1: Adding the answers together yields: "
  print programMemory
