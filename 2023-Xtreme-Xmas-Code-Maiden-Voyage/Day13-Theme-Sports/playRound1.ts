import { FieldSetups } from "./playbook.ts";
import tipOff from "./tipOff.ts";

export default (async function (): Promise<number> {
  const fieldSetups: FieldSetups = await tipOff();

  const finalScore = 100;

  console.log(
    `Part 1: The total of our notes summary is: ${JSON.stringify(finalScore)}`,
  );

  return finalScore;
})();
