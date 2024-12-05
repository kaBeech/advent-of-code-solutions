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
