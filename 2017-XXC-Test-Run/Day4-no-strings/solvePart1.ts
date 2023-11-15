import { comparePassSequenceEquality } from "./comparePassSequenceEquality.ts";
import { parseInput } from "./parseInput.ts";

export const solvePart1 = async () => {
  const passphrases = await parseInput("./challengeInput.txt");
  let validPassphrases = 0;
  passphrases.forEach((passphrase) => {
    let passphraseIsValid = true;
    passphrase.forEach((passSequence1, index1) => {
      for (
        let index2 = index1 + 1;
        index2 < passphrase.length, passphraseIsValid;
        index2++
      ) {
        const passSequence2 = passphrase[index2];
        if (comparePassSequenceEquality(passSequence1, passSequence2)) {
          passphraseIsValid = false;
          return;
        }
      }
    });
    if (passphraseIsValid) {
      validPassphrases++;
    }
  });

  console.log(`Part 1: ${validPassphrases}`);

  return validPassphrases;
};
