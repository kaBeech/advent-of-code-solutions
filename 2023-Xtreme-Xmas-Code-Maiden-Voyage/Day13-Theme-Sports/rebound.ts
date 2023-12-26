import { FieldSetup } from "./playbook.ts";

export default (fieldSetup: FieldSetup): number => {
  let i = 0;
  for (const _yardline of fieldSetup) {
    let line1 = i;
    let line2 = i + 1;
    let reboundMade = true;
    while (line1 >= 0 && line2 < fieldSetup.length) {
      if (line1 !== line2) {
        reboundMade = false;
      }
      line1 -= 1;
      line2 += 1;
    }
    if (reboundMade) {
      return i + 1;
    }
    i += 1;
  }
  return 0;
};
