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

const convertMultiLineStringToArray = async (input: string) => {
    const inputString = await Deno.readTextFile(input);
    return inputString.split(/\n/);
}

const scoreRPS = async (rounds: string | Round[]) => {
    if (typeof(rounds) === "string") {
        rounds = await convertMultiLineStringToArray(rounds) as Round[];
    }
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

export { scoreRPS }