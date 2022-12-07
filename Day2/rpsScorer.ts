import { Round } from "./types";

let shapeSubtotal = 0;
let outcomeSubtotal = 0;
let total = 0;

const subtotalScorer = (round: Round) => {
    switch(round[0]) {
        case "A":
            shapeSubtotal += 1;
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
            shapeSubtotal += 2;
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
            shapeSubtotal += 3;
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
    
    rounds.forEach(subtotalScorer)
    total = shapeSubtotal + outcomeSubtotal

    console.log(`Shape Subtotal: ${shapeSubtotal}`)
    console.log(`Outcome Subtotal: ${outcomeSubtotal}`)
    console.log(`Total: ${total}`)
    
    return total
}

export { rpsScorer }