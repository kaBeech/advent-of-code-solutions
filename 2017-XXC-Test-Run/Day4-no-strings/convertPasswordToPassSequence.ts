import { PassSequence } from "./types.ts";

export const convertPasswordToPassSequence = (
  password: string,
): PassSequence => {
  const passSequence: PassSequence = [];
  for (let i = 0; i < password.length; i++) {
    passSequence.push(password.charCodeAt(i));
  }
  return passSequence;
};
