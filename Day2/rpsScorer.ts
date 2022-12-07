import { Round } from "./types";

let shapeSubtotal = 0;
let outcomeSubtotal = 0;

const shapeScorer = (round: Round) => {
    switch(round[0]) {
        case "A":
            return shapeSubtotal += 1;
        case "B":
            return shapeSubtotal += 2;
        case "C":
            return shapeSubtotal += 3;
    }
}

const outcomeScorer = (round: Round) => {
    switch(round[0]) {
        case "A":
             switch(round[2]) {
                case "X":
                    return outcomeSubtotal += 3;
                case "Y":
                    return outcomeSubtotal += 0;
                case "Z":
                    return outcomeSubtotal += 6;
             }
             break;
        case "B":
            switch(round[2]) {
                case "X":
                    return outcomeSubtotal += 6;
                case "Y":
                    return outcomeSubtotal += 3;
                case "Z":
                    return outcomeSubtotal += 0;
            }
            break;
        case "C":
            switch(round[2]) {
                case "X":
                    return outcomeSubtotal += 0;
                case "Y":
                    return outcomeSubtotal += 6;
                case "Z":
                    return outcomeSubtotal += 3;
            }
    }
}

const rpsScorer = async (input: string) => {
    const inputString = await Deno.readTextFile(input);
    const rounds = inputString.split(/\n/);
    
    rounds.forEach(shapeScorer)
    rounds.forEach(outcomeScorer)
    
    return rounds.length
}

export { rpsScorer }