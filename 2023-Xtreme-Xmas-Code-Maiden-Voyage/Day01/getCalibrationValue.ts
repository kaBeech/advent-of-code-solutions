import getCalibrationValueString from "./getCalibrationValueString.ts";

export default function (
  calibrationLine: string,
): number {
  const calibrationValueString = getCalibrationValueString(calibrationLine);
  const calibrationValue = +calibrationValueString;
  return calibrationValue;
}
