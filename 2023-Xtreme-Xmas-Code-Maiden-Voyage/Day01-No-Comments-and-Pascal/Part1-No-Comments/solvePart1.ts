import getCalibrationSum from "./getCalibrationSum.ts";
import { parseCalibrationDocument } from "./parseCalibrationDocument.ts";
import { CalibrationDocument } from "./types.ts";

export const solvePart1 = (async (): Promise<number> => {
  const calibrationDocument: CalibrationDocument =
    await parseCalibrationDocument();

  const calibrationSum = getCalibrationSum(
    calibrationDocument,
  );

  console.log(`Part 1: The sum of all calibration values is ${calibrationSum}`);

  return calibrationSum;
})();
