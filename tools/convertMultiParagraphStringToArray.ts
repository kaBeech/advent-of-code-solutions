const convertMultiParagraphStringToArray = (inputString: string) => {
    return inputString.split(/\n\n/);
}

export { convertMultiParagraphStringToArray } 