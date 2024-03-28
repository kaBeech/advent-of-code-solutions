import {
  convertMultiLineFileToDoubleArray,
} from "../../tools/conversionFunctions/convertFileToArray.ts";
import { تاريخ, تقرير } from "./أنواع.ts";

export default async (): Promise<تقرير> => {
  const تقرير_خام: string[][] = await convertMultiLineFileToDoubleArray(
    "./مدخلات_كبيرة.dat",
    ` `,
  );
  const تقرير: تقرير = [];
  for (const تاريخ_خام of تقرير_خام) {
    const تاريخ: تاريخ = [];
    for (const رقم of تاريخ_خام) {
      تاريخ.push(+رقم);
    }
    تقرير.push(تاريخ);
  }
  return تقرير;
};
