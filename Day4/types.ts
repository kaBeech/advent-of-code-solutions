import { integer, twoDigitInteger } from "../tools/commonTypes.ts";

type assignment = `${integer | twoDigitInteger}-${integer | twoDigitInteger}`;

type assignmentCouple = assignment[]

export type { assignment, assignmentCouple };
