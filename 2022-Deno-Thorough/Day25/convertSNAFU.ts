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
    }
    return decimal;
}

export const decimalToSNAFU = (decimal: number): string => {
    let snafu = "";
    let exponent = Math.floor(Math.log(decimal) / Math.log(5))
    while (exponent > 0) {
        let digit = Math.floor(decimal / (5 ** exponent))
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
                snafu = carry(snafu) + "="
                break;
            case 4:
                snafu = carry(snafu) + "-"
                break;
            default:
                throw new Error("Unexpected digit: " + digit)
        }
        decimal = decimal - digit * (5 ** exponent)
        exponent--
    }
    switch (decimal) {
        case 5:
            snafu = carry(snafu) + "0"
            break;
        case 4:
            snafu = carry(snafu) + "-"
            break;
        case 3:
            snafu = carry(snafu) + "="
            break;
        case 2:
            snafu = snafu + "2"
            break;
        case 1:
            snafu = snafu + "1"
            break;
        case 0:
            snafu = snafu + "0"
            break;
        default:
            break;
    }
    return snafu;
}

const carry = (snafu: string): string => {
    if (snafu === "") {
        return "1"
    }
    const lastDigit = snafu.slice(-1)
    const allButLastDigit = snafu.slice(0, -1)
    switch (lastDigit) {
        case "=":
            return allButLastDigit + "-"
        case "-":
            return allButLastDigit + "0"
        case "0":
            return allButLastDigit + "1"
        case "1":
            return allButLastDigit + "2"
        case "2":
            return carry(allButLastDigit) + "="
        default:
            throw new Error("Unexpected digit: " + lastDigit)
    }
}
