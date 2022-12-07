import { Round } from "./types.ts";

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

const rpsScorer = async (input: string) => {
    if (input.length < 1) {
        input = "strategyGuide.txt"
    }
    const inputString = await Deno.readTextFile(input);
    const rounds = inputString.split(/\n/) as Round[];
    shapeSubtotal = 0;
    outcomeSubtotal = 0;
    total = 0;
    
    rounds.forEach(subtotalScorer)
    total = shapeSubtotal + outcomeSubtotal

    console.log(`Shape Subtotal: ${shapeSubtotal}`)
    console.log(`Outcome Subtotal: ${outcomeSubtotal}`)
    console.log(`Total: ${total}`)
    
    return total
}

export { rpsScorer }