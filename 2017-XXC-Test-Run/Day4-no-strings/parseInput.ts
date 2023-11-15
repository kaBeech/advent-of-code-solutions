import { convertMultiLineFileToDoubleArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { convertPasswordToPassSequence } from "./convertPasswordToPassSequence.ts";
import { Passphrase, PassSequence } from "./types.ts";

export const parseInput = async (filePath: string): Promise<Passphrase[]> => {
  const rawPassphrases: string[][] = await convertMultiLineFileToDoubleArray(
    filePath,
    " ",
  );
  const passphrases: Passphrase[] = [];
  rawPassphrases.forEach((rawPassphrase) => {
    const passSequences: PassSequence[] = [];
    rawPassphrase.forEach((rawPassword) => {
      passSequences.push(convertPasswordToPassSequence(rawPassword));
    });
    passphrases.push(passSequences);
  });
  return passphrases;
};
