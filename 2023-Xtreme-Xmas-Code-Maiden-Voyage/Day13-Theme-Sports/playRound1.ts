import { FieldSetups } from "./playbook.ts";
import scoreRebound from "./scoreRebound.ts";
import tipOff from "./tipOff.ts";

export default (async function (): Promise<number> {
  const fieldSetups: FieldSetups = await tipOff();
  let finalScore = 0;

  for (const fieldSetup of fieldSetups) {
    finalScore += scoreRebound(fieldSetup);
  }

  console.log(
    `Part 1: The total of our notes summary is: ${JSON.stringify(finalScore)}`,
  );

  return finalScore;
})();
