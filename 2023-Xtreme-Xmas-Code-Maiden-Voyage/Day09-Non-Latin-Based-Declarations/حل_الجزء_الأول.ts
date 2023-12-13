import تحليل_المدخلات from "./تحليل_المدخلات.ts";
import { تسلسلات_تاريخية, تقرير } from "./أنواع.ts";
import بناء_تسلسلات from "./بناء_تسلسلات.ts";
import استقراء_تسلسل from "./استقراء_تسلسل.ts";

export default (async function (): Promise<تقرير> {
  const تقرير: تقرير = await تحليل_المدخلات();

  const تقرير_التسلسلات_التاريخية: تسلسلات_تاريخية[] = [];

  for (const تاريخ of تقرير) {
    تقرير_التسلسلات_التاريخية.push(بناء_تسلسلات(تاريخ));
  }

  for (let تسلسلات_تاريخية of تقرير_التسلسلات_التاريخية) {
    تسلسلات_تاريخية = استقراء_تسلسل(تسلسلات_تاريخية);
  }

  console.log(تقرير_التسلسلات_التاريخية);

  console.log(
    `Part 1: The sum of the extrapolated data is ${
      JSON.stringify(`ExtrapolatedSum`)
    }`,
  );

  return تقرير;
})();
