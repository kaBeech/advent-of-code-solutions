module Parse
  ( parseInput,
  )
where

import Types (Spec)

-- | Takes a string and returns a Spec.

-- | ==== __Examples__
--   >>> parseInput "Button A: X+94, Y+34\nButton B: X+22, Y+67\nPrize: X=8400, Y=5400\n\nButton A: X+26, Y+66\nButton B: X+67, Y+21\nPrize: X=12748, Y=12176"
--   [Spec {a = (94, 34), b = (22, 67), prize = (8400, 5400)}, Spec {a = (26, 66), b = (67, 21), prize = (12748, 12176)}]
parseInput :: Integer -> String -> [Spec]
parseInput bonus input = parseInput' bonus [] $ filter (/= "") $ lines input

parseInput' :: Integer -> [Spec] -> [String] -> [Spec]
parseInput' _ specs [] = specs
parseInput' bonus specs (aLine : bLine : prizeLine : rest) =
  parseInput'
    bonus
    ( ( parseX aLine,
        parseY aLine,
        parseX bLine,
        parseY bLine,
        parseX prizeLine + bonus,
        parseY prizeLine + bonus
      )
        : specs
    )
    rest
parseInput' _ _ _ = error "Error on input format. Expected three lines per spec."

parseX :: String -> Integer
parseX = read . takeWhile (/= ',') . drop 2 . dropWhile (/= 'X')

parseY :: String -> Integer
parseY = read . drop 2 . dropWhile (/= 'Y')
