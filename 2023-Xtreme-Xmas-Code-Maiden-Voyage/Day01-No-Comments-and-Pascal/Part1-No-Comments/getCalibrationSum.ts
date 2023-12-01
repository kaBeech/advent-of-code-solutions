import getCalibrationValue from "./getCalibrationValue.ts";
import { CalibrationDocument } from "./types.ts";

export default function (
  calibrationDocument: CalibrationDocument,
): number {
  let calibrationSum = 0;
  calibrationDocument.forEach((calibrationLine) => {
    const calibrationValue = getCalibrationValue(calibrationLine);
    calibrationSum += calibrationValue;
  });
  return calibrationSum;
}
