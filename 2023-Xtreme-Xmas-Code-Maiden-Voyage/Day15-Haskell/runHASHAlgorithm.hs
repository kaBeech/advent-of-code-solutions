getASCIICode = fromEnum

multiplyBy17 x = x * 17

modulo256 x = x `mod` 256

runHASHAlgorithmOnChar currentValue nextCharacter = modulo256 (multiplyBy17 (currentValue + getASCIICode nextCharacter))

-- exampleHASH = [72, 65, 83, 72]
exampleHASH = ['r', 'n', '=', '1']

testHASHAlgorithm startingValue = foldl runHASHAlgorithmOnChar 0 exampleHASH