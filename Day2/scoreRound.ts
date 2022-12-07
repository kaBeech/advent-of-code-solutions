import { Round } from "./types.ts";

const scoreRound = (round: Round) => {
    const score = [0,0]
    switch(round[2]) {
        case "X":
            score[0] = 1;
            switch(round[0]) {
                case "A":
                score[1] = 3;
                break;
                case "B":
                score[1] = 0;
                break;
                case "C":
                score[1] = 6;
            }
            break;
        case "Y":
            score[0] = 2;
            switch(round[0]) {
                case "A":
                score[1] = 6;
                break;
                case "B":
                score[1] = 3;
                break;
                case "C":
                score[1] = 0;
            }
            break;
        case "Z":
            score[0] = 3;
            switch(round[0]) {
                case "A":
                score[1] = 0;
                break;
                case "B":
                score[1] = 6;
                break;
                case "C":
                score[1] = 3;
            }
    }
    console.log(score);
    return score
}

export { scoreRound }