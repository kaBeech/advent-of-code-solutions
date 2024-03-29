import {
  convertMultiParagraphFileToArray,
} from "../../tools/conversionFunctions/convertFileToArray.ts";
import { FieldSetups } from "./playbook.ts";

export default async (): Promise<FieldSetups> => {
  const fieldSetups: FieldSetups = await convertMultiParagraphFileToArray(
    "./tournament.dat",
  );
  return fieldSetups;
};
