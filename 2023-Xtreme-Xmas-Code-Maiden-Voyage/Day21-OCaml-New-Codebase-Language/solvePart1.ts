const parseInput = async (): Promise<number> => {
    const inputFile = "./challengeInput.dat"

    let possibleSpaces = 0;
    let y = 64;

    const inputLines = await Deno.readTextFile(inputFile).then((text) => text.trim().split("\n"));
    for (const inputLine of inputLines) {
        let x = -64;
        for (const char of inputLine) {
            if (char === "." && (Math.abs(x) + Math.abs(y)) <= 64 && (Math.abs(x) + Math.abs(y)) % 2 === 0) {
                possibleSpaces++;
            }
            x++;
        }
        y--;
    }


    return possibleSpaces;
};

export default (async function(): Promise<number> {

    const possibleSpaces = await parseInput();

    console.log("Part 1: The solution might be ", possibleSpaces);

    return possibleSpaces;
})();
