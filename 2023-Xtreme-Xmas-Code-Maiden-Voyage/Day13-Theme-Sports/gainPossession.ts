import { FieldSetup } from "./playbook.ts";

export default (fieldSetup: FieldSetup): FieldSetup => {
  const offensiveFieldSetup: FieldSetup = [];

  for (let i = 0; i < fieldSetup[0].length; i++) {
    let offensiveYardline = "";
    for (const defensiveYardline of fieldSetup) {
      offensiveYardline += defensiveYardline[i];
    }
    offensiveFieldSetup.push(offensiveYardline);
  }

  return offensiveFieldSetup;
};
