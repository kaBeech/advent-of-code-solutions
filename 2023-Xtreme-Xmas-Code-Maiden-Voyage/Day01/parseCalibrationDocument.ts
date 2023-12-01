import { convertMultiLineFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { CalibrationDocument } from "./types.ts";

export const parseCalibrationDocument = async (): Promise<
  CalibrationDocument
> => {
  const calibrationDocument: CalibrationDocument =
    await convertMultiLineFileToArray(
      "./challengeInput.txt",
    );

  return calibrationDocument;
};
