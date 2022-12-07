const convertMultiLineStringToArray = async (input: string) => {
    const inputString = await Deno.readTextFile(input);
    return inputString.split(/\n/);
}

export { convertMultiLineStringToArray } 