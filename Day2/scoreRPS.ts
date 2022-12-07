import { Round, ScoringMethod } from "./types.ts";
import { scoreRound } from "./scoreRound.ts";
import { scoreRoundCrypto } from "./scoreRoundCrypto.ts";
import { convertMultiLineStringToArray } from "../tools/convertMultiLineStringToArray.ts"

let shapeSubtotal = 0;
let outcomeSubtotal = 0;
let total = 0;
let scoringMethod = "simple"

const sumRoundScores = (round: Round) => {
    let result;
    if (scoringMethod === "crypto") {
        result = scoreRoundCrypto(round)
    } else {
        result = scoreRound(round)       
    }
    shapeSubtotal += result[0];
    outcomeSubtotal += result[1];
}

const scoreRPS = async (rounds: string | Round[], method: ScoringMethod) => {
    if (typeof(rounds) === "string") {
        rounds = await convertMultiLineStringToArray(rounds) as Round[];
    }
    shapeSubtotal = 0;
    outcomeSubtotal = 0;
    total = 0;
    scoringMethod = method
    
    rounds.forEach(sumRoundScores)
    total = shapeSubtotal + outcomeSubtotal

    console.log(`Shape Subtotal: ${shapeSubtotal}`)
    console.log(`Outcome Subtotal: ${outcomeSubtotal}`)
    console.log(`Total: ${total}`)

    return total
}

export { scoreRPS }