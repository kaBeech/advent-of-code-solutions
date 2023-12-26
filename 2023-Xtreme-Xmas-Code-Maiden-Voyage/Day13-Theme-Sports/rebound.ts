import { FieldSetup } from "./playbook.ts";

export default (fieldSetup: FieldSetup): number => {
  let reboundPosition = 0;
  let reboundMade = false;
  while (reboundPosition < fieldSetup.length - 1 && !reboundMade) {
    let reboundDenied = false;
    let yardline1 = reboundPosition;
    let yardline2 = reboundPosition + 1;
    while (yardline1 >= 0 && yardline2 < fieldSetup.length && !reboundDenied) {
      if (fieldSetup[yardline1] !== fieldSetup[yardline2]) {
        reboundDenied = true;
      }
      yardline1 -= 1;
      yardline2 += 1;
    }
    if (!reboundDenied) {
      reboundMade = true;
    }
    reboundPosition += 1;
  }
  if (reboundMade) {
    return reboundPosition;
  } else {
    return 0;
  }
};
