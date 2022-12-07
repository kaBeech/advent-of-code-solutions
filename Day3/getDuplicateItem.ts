import { convertMultiLineStringToArray } from "../tools/convertMultiLineStringToArray.ts"

let duplicateItem = "A";


const getDuplicateItem = async (input: any) => {
    if (typeof(input) === "string") {
        input = await convertMultiLineStringToArray(input) as any[];
    }

    duplicateItem = "A";

    return duplicateItem
}

export { getDuplicateItem }