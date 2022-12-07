import { Round } from "./types.ts";
import { convertMultiLineStringToArray } from "../tools/convertMultiLineStringToArray.ts"

let shapeSubtotal = 0;
let outcomeSubtotal = 0;
let total = 0;

const subtotalScorer = (round: Round) => {
    switch(round[2]) {
        case "X":
            outcomeSubtotal += 0;
            switch(round[0]) {
            case "A":
                return shapeSubtotal += 3;
            case "B":
                return shapeSubtotal += 1;
            case "C":
                return shapeSubtotal += 2;
            }
            break;
        case "Y":
            outcomeSubtotal += 3;
            switch(round[0]) {
                case "A":
                    return shapeSubtotal += 1;
                case "B":
                    return shapeSubtotal += 2;
                case "C":
                    return shapeSubtotal += 3;
            }
            break;
        case "Z":
            outcomeSubtotal += 6;
            switch(round[0]) {
                case "A":
                    return shapeSubtotal += 2;
                case "B":
                    return shapeSubtotal += 3;
                case "C":
                    return shapeSubtotal += 1;
            }
    }
}

const scoreCryptoRPS = async (rounds: string | Round[]) => {
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

export { scoreCryptoRPS }