import { integer, twoDigitInteger } from "../tools/commonTypes.ts";

type assignment = `${integer | twoDigitInteger}-${integer | twoDigitInteger}`;

type assignmentCouple = assignment[];

type overlapMethod = "full" | "partial";

export type { assignment, assignmentCouple, overlapMethod };
