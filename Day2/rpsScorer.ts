const rpsScorer = async (input: string) => {
    console.log("Hello World!")

    const testInput = await Deno.readTextFile(input);
    
    return testInput.length
}

export { rpsScorer }