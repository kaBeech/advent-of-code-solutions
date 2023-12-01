import isStringAnInteger from "./isStringAnInteger.ts";

export default function (
  calibrationLine: string,
): string {
  let firstInteger = "";
  for (let i = 0; firstInteger === "" && i < calibrationLine.length; i++) {
    const selectedCharacter = calibrationLine[i];
    if (isStringAnInteger(selectedCharacter)) {
      firstInteger = selectedCharacter;
    }
  }
  return firstInteger;
}
