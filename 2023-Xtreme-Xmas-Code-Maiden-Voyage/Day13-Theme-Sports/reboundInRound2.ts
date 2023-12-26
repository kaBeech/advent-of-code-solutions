import { FieldSetup } from "./playbook.ts";

export default (fieldSetup: FieldSetup): number => {
  let reboundPosition = 0;
  let openingFound = false;
  while (reboundPosition < fieldSetup.length - 1 && !openingFound) {
    let reboundDenied = false;
    let yardline1 = reboundPosition;
    let yardline2 = reboundPosition + 1;
    while (yardline1 >= 0 && yardline2 < fieldSetup.length && !reboundDenied) {
      if (fieldSetup[yardline1] !== fieldSetup[yardline2]) {
        if (
          !openingFound &&
          findOpening(fieldSetup[yardline1], fieldSetup[yardline2])
        ) {
          openingFound = true;
        } else {
          reboundDenied = true;
        }
      }
      yardline1 -= 1;
      yardline2 += 1;
    }
    if (reboundDenied) {
      openingFound = true;
    }
    reboundPosition += 1;
  }
  if (openingFound) {
    return reboundPosition;
  } else {
    return 0;
  }
};
