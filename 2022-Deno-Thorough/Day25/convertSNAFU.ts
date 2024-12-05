export const snafuToDecimal = (snafu: string): number => {
    let decimal = 0;
    let exponent = 0
    while (snafu.length > 0) {
        let digit = snafu.slice(-1)
        switch (digit) {
            case "=":
                decimal -= 2 * Math.pow(5, exponent)
                break;
            case "-":
                decimal -= Math.pow(5, exponent)
                break;
            default:
                decimal += parseInt(digit) * Math.pow(5, exponent)
                break;
        }
        exponent++
        snafu = snafu.slice(0, -1)
        return decimal;
    }
}

export const decimalToSNAFU = (decimal: number): string => {
    let snafu = "";
    let exponent = Math.floor(Math.log(decimal) / Math.log(5))
    while (decimal > 0) {
        let digit = decimal % (5 ** exponent)
        switch (digit) {
            case 0:
                snafu = snafu + "0"
                break;
            case 1:
                snafu = snafu + "1"
                break;
            case 2:
                snafu = snafu + "2"
                break;
            case 3:
                snafu = carry(snafu, 1)
                break;
            case 4:
                snafu = carry(snafu, 2)
                break;
            default:
                throw new Error("Unexpected digit: " + digit)
        }
        decimal = decimal - digit * (5 ** exponent)
        exponent--
    }
    return snafu;
}

const carry = (snafu: string, digit: number): string => {
    if (digit !== 1 && digit !== 2) {
        throw new Error("Expected digit amount of 1 or 2; got: " + digit)
    }
    if (snafu.length === 0) {
        digit === 1 ? "=" : "-"
    }
    const lastDigit = snafu.slice(-1)
    const allButLastDigit = snafu.slice(0, -1)
    switch (lastDigit) {
        case "=":
            return digit === 1 ? allButLastDigit + "-" : allButLastDigit + "0"
        case "-":
            return digit === 1 ? allButLastDigit + "0" : allButLastDigit + "1"
        case "0":
            return digit === 1 ? allButLastDigit + "1" : allButLastDigit + "2"
        case "1":
            if (digit === 1) { return allButLastDigit + "2" } else { return carry(allButLastDigit, 1) + "=" }
        case "2":
            return digit === 1 ? carry(allButLastDigit, 1) + "=" : carry(allButLastDigit, 2) + "-"
        default:
            throw new Error("Unexpected digit: " + lastDigit)
    }
}
