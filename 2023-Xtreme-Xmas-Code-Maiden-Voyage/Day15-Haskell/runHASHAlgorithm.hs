-- getASCIICode = fromEnum

-- multiplyBy17 x = x * 17

-- modulo256 x = x `mod` 256

runHASHAlgorithmOnChar currentValue nextCharacter = (currentValue + fromEnum nextCharacter) * 17 `mod` 256

-- exampleHASH = [72, 65, 83, 72]
exampleHASH = "rn=1"

testHASHAlgorithm startingValue = foldl runHASHAlgorithmOnChar 0 exampleHASH