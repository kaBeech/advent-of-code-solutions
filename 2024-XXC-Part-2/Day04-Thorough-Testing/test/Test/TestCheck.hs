module Test.TestCheck (check) where

check :: (Eq a, Show a, Show b) => String -> a -> a -> b -> Bool
check name expected actual input =
  (expected == actual) || error (mkTestFailMsg name (show expected) (show actual) (show input))

mkTestFailMsg :: String -> String -> String -> String -> String
mkTestFailMsg name expected actual input =
  "Testing " ++ name ++ " failed: Expected " ++ expected ++ ", but got " ++ actual ++ " for input " ++ input
