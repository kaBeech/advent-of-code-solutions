import getFirstIntegerInString from "./getFirstIntegerInString.ts";
import getLastIntegerInString from "./getLastIntegerInString.ts";

export default function (
  calibrationLine: string,
): string {
  const calibrationValueFirstDigit: string = getFirstIntegerInString(
    calibrationLine,
  );
  const calibrationValueSecondDigit: string = getLastIntegerInString(
    calibrationLine,
  );
  const calibrationValueString = calibrationValueFirstDigit +
    calibrationValueSecondDigit;
  return calibrationValueString;
}
