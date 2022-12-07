const convertMultiParagraphStringToArray = async (input: string) => {
    const inputString = await Deno.readTextFile(input);
    return inputString.split(/\n\n/);
}

export { convertMultiParagraphStringToArray } 