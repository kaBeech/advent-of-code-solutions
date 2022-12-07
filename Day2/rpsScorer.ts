import { Round } from "./types";

let shapeSubtotal = 0;

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


const rpsScorer = async (input: string) => {
    const inputString = await Deno.readTextFile(input);
    const rounds = inputString.split(/\n/);
    
    rounds.forEach(shapeScorer)


    
    return rounds.length
}

export { rpsScorer }