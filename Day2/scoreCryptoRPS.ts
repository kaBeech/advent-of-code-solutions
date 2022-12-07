import { Round } from "./types.ts";
import { scoreRPS } from "./scoreRPS.ts"
import { convertMultiLineStringToArray } from "../tools/convertMultiLineStringToArray.ts"

let shapeSubtotal = 0;
let outcomeSubtotal = 0;
let total = 0;

const subtotalScorer = (round: Round) => {
    switch(round[2]) {
        case "X":
            shapeSubtotal += 1;
            switch(round[0]) {
            case "A":
                return outcomeSubtotal += 3;
            case "B":
                return outcomeSubtotal += 0;
            case "C":
                return outcomeSubtotal += 6;
            }
            break;
        case "Y":
            shapeSubtotal += 2;
            switch(round[0]) {
                case "A":
                    return outcomeSubtotal += 6;
                case "B":
                    return outcomeSubtotal += 3;
                case "C":
                    return outcomeSubtotal += 0;
            }
            break;
        case "Z":
            shapeSubtotal += 3;
            switch(round[0]) {
                case "A":
                    return outcomeSubtotal += 0;
                case "B":
                    return outcomeSubtotal += 6;
                case "C":
                    return outcomeSubtotal += 3;
            }
    }
}

const scoreCryptoRPS = async (rounds: string | Round[]) => {
    if (typeof(rounds) === "string") {
        rounds = await convertMultiLineStringToArray(rounds) as Round[];
    }

    return scoreRPS(rounds)
}

export { scoreCryptoRPS }