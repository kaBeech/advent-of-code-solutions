import isStringAnInteger from "./isStringAnInteger.ts";

export default function (
  calibrationLine: string,
): string {
  let lastInteger = "";
  for (let i = calibrationLine.length - 1; lastInteger === "" && i >= 0; i--) {
    const selectedCharacter = calibrationLine[i];
    if (isStringAnInteger(selectedCharacter)) {
      lastInteger = selectedCharacter;
    }
  }
  return lastInteger;
}
