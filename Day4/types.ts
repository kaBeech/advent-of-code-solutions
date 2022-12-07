import { integer, twoDigitInteger } from "../tools/commonTypes.ts";

type assignmentCouple = `${integer | twoDigitInteger}-${integer | twoDigitInteger}`;


export type { assignmentCouple };
