import { Round } from "./types.ts";

const scoreRoundCrypto = (round: Round) => {
  const score = [0, 0];
  switch (round[2]) {
    case "X":
      score[1] = 0;
      switch (round[0]) {
        case "A":
          score[0] = 3;
          break;
        case "B":
          score[0] = 1;
          break;
        case "C":
          score[0] = 2;
      }
      break;
    case "Y":
      score[1] = 3;
      switch (round[0]) {
        case "A":
          score[0] = 1;
          break;
        case "B":
          score[0] = 2;
          break;
        case "C":
          score[0] = 3;
      }
      break;
    case "Z":
      score[1] = 6;
      switch (round[0]) {
        case "A":
          score[0] = 2;
          break;
        case "B":
          score[0] = 3;
          break;
        case "C":
          score[0] = 1;
      }
  }
  return score;
};

export { scoreRoundCrypto };
