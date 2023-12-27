multiplyBy17 x = x * 17

modulo256 x = x `mod` 256

runHASHAlgorithm currentValue nextCharacter = modulo256 (multiplyBy17 (currentValue + nextCharacter))