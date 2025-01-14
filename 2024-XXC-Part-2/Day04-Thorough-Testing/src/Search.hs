module Search (countWords, countXWords) where

import Types (WordMap)

-- | Takes a word and a WordMap and returns the number of times the word
--   appears in the WordMap, Word Search style.

-- | ==== __Examples__
--   >>> countWords "XMAS" [[('X',(0,0)),('M',(1,0)),('A',(2,0)),('S',(3,0))],[('M',(0,1)),('M',(1,1)),('M',(2,1)),('M',(3,1))],[('A',(0,2)),('M',(1,2)),('A',(2,2)),('M',(3,2))],[('S',(0,3)),('M',(1,3)),('M',(2,3)),('S',(3,3))]]
--   3
--
--   >>> countWords "XMAS" [[('S',(0,0)),('M',(1,0)),('M',(2,0)),('S',(3,0))],[('M',(0,1)),('A',(1,1)),('M',(2,1)),('A',(3,1))],[('M',(0,2)),('M',(1,2)),('M',(2,2)),('M',(3,2))],[('S',(0,3)),('A',(1,3)),('M',(2,3)),('X',(3,3))]]
--   3
--
--   >>> countWords "XMAS" [[('M',(0,0)),('M',(1,0)),('M',(2,0)),('M',(3,0)),('M',(4,0))],[('M',(0,1)),('M',(1,1)),('M',(2,1)),('S',(3,1)),('X',(4,1))],[('M',(0,2)),('M',(1,2)),('A',(2,2)),('M',(3,2)),('M',(4,2))],[('M',(0,3)),('M',(1,3)),('A',(2,3)),('A',(3,3)),('M',(4,3))],[('X',(0,4)),('S',(1,4)),('S',(2,4)),('M',(3,4)),('M',(4,4))]]
--   2
--
--   >>> countWords "XMAS" [[('X',(0,0)),('A',(1,0)),('M',(2,0)),('A',(3,0)),('A',(4,0))],[('S',(0,1)),('X',(1,1)),('M',(2,1)),('A',(3,1)),('M',(4,1))],[('M',(0,2)),('A',(1,2)),('M',(2,2)),('M',(3,2)),('S',(4,2))],[('X',(0,3)),('M',(1,3)),('A',(2,3)),('M',(3,3)),('S',(4,3))],[('X',(0,4)),('M',(1,4)),('A',(2,4)),('X',(3,4)),('X',(4,4))]]
--   0
countWords :: String -> WordMap -> Int
-- For each letter in the WordMap, check if the word appears starting from that
-- letter.
countWords word wordMap =
  sum
    [ countWordsFromLetter word (x, y) wordMap
      | x <- [0 .. length (head wordMap) - 1],
        y <- [0 .. length wordMap - 1]
    ]

-- | Takes a word and a WordMap and returns the number of times the word
--   appears in the WordMap in an "X" shape.

-- | ==== __Examples__
--   "MXS\nXAX\nMXS"
--   >>> countXWords "MAS" [[('M',(0,0)),('X',(1,0)),('S',(2,0))],[('X',(0,1)),('A',(1,1)),('X',(2,1))],[('M',(0,2)),('X',(1,2)),('S',(2,2))]]
--   1
--
--   >>> countXWords "XMAS" [[('X',(0,0)),('M',(1,0)),('A',(2,0)),('S',(3,0))],[('M',(0,1)),('M',(1,1)),('M',(2,1)),('M',(3,1))],[('A',(0,2)),('M',(1,2)),('S',(2,2)),('M',(3,2))],[('S',(0,3)),('M',(1,3)),('M',(2,3)),('S',(3,3))]]
--   *** Exception: Word length must be odd
countXWords :: String -> WordMap -> Int
countXWords word wordMap =
  let (semiword1, semiword2) = getSemiwords word
   in sum
        [ countXWordsFromLetter semiword1 semiword2 (x, y) wordMap
          | x <- [0 .. length (head wordMap) - 1],
            y <- [0 .. length wordMap - 1]
        ]

-- | Takes a word and returns the two semiwords that make up the word.
--
--   Semiwords are the two halves of a word, with the first half reversed. The
--   first semiword starts with the middle letter.
--
--   In order to be reducable into semiwords, the word must contain an odd
--   number of letters.

-- | ==== __Examples__
--  >>> getSemiwords "MAS"
--  ("AM","S")
--
--  >>> getSemiwords "X"
--  ("X","")
--
--  >>> getSemiwords "XMAS"
--  *** Exception: Word length must be odd
--
--  >>> getSemiwords ""
--  *** Exception: Word length must be odd
getSemiwords :: String -> (String, String)
getSemiwords word =
  if even (length word)
    then error "Word length must be odd"
    else
      let (semiword1, semiword2) = splitAt ((length word `div` 2) + 1) word
          semiword1' = reverse semiword1
       in (semiword1', semiword2)

-- | Takes a word, a starting XYCoord, and a WordMap, and returns the number of
--   times the word appears in the WordMap starting from the given XYCoord.

-- | ==== __Examples__
--   >>> countWordsFromLetter "XMAS" (0, 0) [[('X', (0, 0)), ('M', (1, 0)), ('A', (2, 0)), ('S', (3, 0))], [('M', (0, 1)), ('M', (1, 1)), ('M', (2, 1)), ('M', (3, 1))], [('A', (0, 2)), ('M', (1, 2)), ('A', (2, 2)), ('M', (3, 2))], [('S', (0, 3)), ('M', (1, 3)), ('M', (2, 3)), ('S', (3, 3))]]
--   3
--
--   >>> countWordsFromLetter "XMAS" (3, 3) [[('S',(0,0)),('M',(1,0)),('M',(2,0)),('S',(3,0))],[('M',(0,1)),('A',(1,1)),('M',(2,1)),('A',(3,1))],[('M',(0,2)),('M',(1,2)),('M',(2,2)),('M',(3,2))],[('S',(0,3)),('A',(1,3)),('M',(2,3)),('X',(3,3))]]
--   3
--
--   >>> countWordsFromLetter "XMAS" (2, 3) [[('S',(0,0)),('M',(1,0)),('M',(2,0)),('S',(3,0))],[('M',(0,1)),('A',(1,1)),('M',(2,1)),('A',(3,1))],[('M',(0,2)),('M',(1,2)),('M',(2,2)),('M',(3,2))],[('S',(0,3)),('A',(1,3)),('M',(2,3)),('X',(3,3))]]
--   0
--
--   >>> countWordsFromLetter "XMAS" (4, 1) [[('M',(0,0)),('M',(1,0)),('M',(2,0)),('M',(3,0)),('M',(4,0))],[('M',(0,1)),('M',(1,1)),('M',(2,1)),('S',(3,1)),('X',(4,1))],[('M',(0,2)),('M',(1,2)),('A',(2,2)),('M',(3,2)),('M',(4,2))],[('M',(0,3)),('M',(1,3)),('A',(2,3)),('A',(3,3)),('M',(4,3))],[('X',(0,4)),('S',(1,4)),('S',(2,4)),('M',(3,4)),('M',(4,4))]]
--   1
--
--   >>> countWordsFromLetter "XMAS" (0, 4) [[('M',(0,0)),('M',(1,0)),('M',(2,0)),('M',(3,0)),('M',(4,0))],[('M',(0,1)),('M',(1,1)),('M',(2,1)),('S',(3,1)),('X',(4,1))],[('M',(0,2)),('M',(1,2)),('A',(2,2)),('M',(3,2)),('M',(4,2))],[('M',(0,3)),('M',(1,3)),('A',(2,3)),('A',(3,3)),('M',(4,3))],[('X',(0,4)),('S',(1,4)),('S',(2,4)),('M',(3,4)),('M',(4,4))]]
--   1
countWordsFromLetter :: String -> (Int, Int) -> WordMap -> Int
countWordsFromLetter word (x, y) wordMap =
  let firstLetterCorrect = checkLetter word (x, y) wordMap
      word' = drop 1 word
   in if firstLetterCorrect
        then
          sum
            [ checkWord word' (x, y) direction wordMap
              | direction <- [0 .. 7]
            ]
        else 0

-- | Takes two semiwords, a starting XYCoord, and a WordMap, and returns the
--   number of times the word appears in the WordMap in an 'X' pattern starting
--   from the given XYCoord.

-- | ==== __Examples__
--   >>> countXWordsFromLetter "AM" "S" (1, 1) [[('M',(0,0)),('X',(1,0)),('S',(2,0))],[('X',(0,1)),('A',(1,1)),('X',(2,1))],[('M',(0,2)),('X',(1,2)),('S',(2,2))]]
--   1
--
--   >>> countXWordsFromLetter "AM" "S" (1, 0) [[('M',(0,0)),('X',(1,0)),('S',(2,0))],[('X',(0,1)),('A',(1,1)),('X',(2,1))],[('M',(0,2)),('X',(1,2)),('S',(2,2))]]
--   0
countXWordsFromLetter :: String -> String -> (Int, Int) -> WordMap -> Int
countXWordsFromLetter semiword1 semiword2 (x, y) wordMap =
  let firstLetterCorrect = checkLetter semiword1 (x, y) wordMap
      semiword1' = drop 1 semiword1
   in if firstLetterCorrect
        then
          ( sum
              [ checkSemiwords semiword1' semiword2 (x, y) direction wordMap
                | direction <- [1, 3, 5, 7]
              ]
          )
            `div` 2
        else 0

-- | Takes a word, an XYCoord, and a WordMap, and returns True if the first
--   letter of the word appears in the WordMap at the given XYCoord. Otherwise,
--   returns False.

-- | ==== __Examples__
--   >>> checkLetter "XMAS" (0, 0) [[('X',(0,0)),('M',(1,0)),('A',(2,0)),('S',(3,0))],[('M',(0,1)),('M',(1,1)),('M',(2,1)),('M',(3,1))],[('A',(0,2)),('M',(1,2)),('S',(2,2)),('M',(3,2))],[('S',(0,3)),('M',(1,3)),('M',(2,3)),('S',(3,3))]]
--   True
--
--   >>> checkLetter "MAS" (1, 0) [[('X',(0,0)),('M',(1,0)),('A',(2,0)),('S',(3,0))],[('M',(0,1)),('M',(1,1)),('M',(2,1)),('M',(3,1))],[('A',(0,2)),('M',(1,2)),('S',(2,2)),('M',(3,2))],[('S',(0,3)),('M',(1,3)),('M',(2,3)),('S',(3,3))]]
--   True
--
--   >>> checkLetter "XMAS" (1, 0) [[('X',(0,0)),('M',(1,0)),('A',(2,0)),('S',(3,0))],[('M',(0,1)),('M',(1,1)),('M',(2,1)),('M',(3,1))],[('A',(0,2)),('M',(1,2)),('S',(2,2)),('M',(3,2))],[('S',(0,3)),('M',(1,3)),('M',(2,3)),('S',(3,3))]]
--   False
checkLetter :: String -> (Int, Int) -> WordMap -> Bool
checkLetter word (x, y) wordMap =
  let inRange = (x >= 0 && y >= 0 && x < length (head wordMap) && y < length wordMap)
      letterMatches = (fst ((wordMap !! y) !! x) == head word)
   in inRange && letterMatches

-- | Takes a word, an XYCoord, a direction, and a WordMap, and returns 1 if the
--   word appears in the WordMap starting from the given XYCoord and following
--   the given direction. Otherwise, returns 0.

-- | ==== __Examples__
--   >>> checkWord "MAS" (0, 0) 0 [[('X',(0,0)),('M',(1,0)),('A',(2,0)),('S',(3,0))],[('M',(0,1)),('M',(1,1)),('M',(2,1)),('M',(3,1))],[('M',(0,2)),('M',(1,2)),('M',(2,2)),('M',(3,2))],[('M',(0,3)),('M',(1,3)),('M',(2,3)),('M',(3,3))]]
--   1
--
--   >>> checkWord "MAS" (0, 0) 1 [[('X',(0,0)),('M',(1,0)),('A',(2,0)),('S',(3,0))],[('M',(0,1)),('M',(1,1)),('M',(2,1)),('M',(3,1))],[('M',(0,2)),('M',(1,2)),('M',(2,2)),('M',(3,2))],[('M',(0,3)),('M',(1,3)),('M',(2,3)),('M',(3,3))]]
--   0
--
--   >>> checkWord "AS" (1, 0) 0 [[('X',(0,0)),('M',(1,0)),('A',(2,0)),('S',(3,0))],[('M',(0,1)),('M',(1,1)),('M',(2,1)),('M',(3,1))],[('M',(0,2)),('M',(1,2)),('M',(2,2)),('M',(3,2))],[('M',(0,3)),('M',(1,3)),('M',(2,3)),('M',(3,3))]]
--   1
--
--   >>> checkWord "" (0, 0) 0 [[('X',(0,0)),('M',(1,0)),('A',(2,0)),('S',(3,0))],[('M',(0,1)),('M',(1,1)),('M',(2,1)),('M',(3,1))],[('M',(0,2)),('M',(1,2)),('M',(2,2)),('M',(3,2))],[('M',(0,3)),('M',(1,3)),('M',(2,3)),('M',(3,3))]]
--   1
checkWord :: String -> (Int, Int) -> Int -> WordMap -> Int
checkWord [] _ _ _ = 1
checkWord word currentCoord direction wordMap =
  let (x, y) = currentCoord
      nextCoord = case direction of
        0 -> (x + 1, y)
        1 -> (x + 1, y + 1)
        2 -> (x, y + 1)
        3 -> (x - 1, y + 1)
        4 -> (x - 1, y)
        5 -> (x - 1, y - 1)
        6 -> (x, y - 1)
        7 -> (x + 1, y - 1)
        _ -> error "Invalid direction"
   in if checkLetter word nextCoord wordMap
        then checkWord (drop 1 word) nextCoord direction wordMap
        else 0

-- | Takes two semiwords, a starting XYCoord, a direction, and a WordMap, and
--   returns 1 if the word appears in the WordMap starting from the given
--   XYCoord and following the given direction for the first semiword.
--   Otherwise, returns 0.

-- | ==== __Examples__
--   >>> checkSemiwords "M" "S" (1, 1) 3 [[('M',(0,0)),('X',(1,0)),('S',(2,0))],[('X',(0,1)),('A',(1,1)),('X',(2,1))],[('M',(0,2)),('X',(1,2)),('S',(2,2))]]
--   1
--
--   >>> checkSemiwords "M" "S" (1, 1) 1 [[('M',(0,0)),('X',(1,0)),('S',(2,0))],[('X',(0,1)),('A',(1,1)),('X',(2,1))],[('M',(0,2)),('X',(1,2)),('S',(2,2))]]
--   0
checkSemiwords :: String -> String -> (Int, Int) -> Int -> WordMap -> Int
checkSemiwords semiword1 semiword2 currentCoord direction wordMap =
  let crossDirection = (direction + 4) `mod` 8
      semiword1Found = checkWord semiword1 currentCoord direction wordMap
      semiword2Found = checkWord semiword2 currentCoord crossDirection wordMap
   in semiword1Found * semiword2Found
