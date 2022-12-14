import { SingleDigitIntegerString, TwoDigitIntegerString } from "../tools/commonTypes.ts";

type Assignment = `${SingleDigitIntegerString | TwoDigitIntegerString}-${SingleDigitIntegerString | TwoDigitIntegerString}`;

type AssignmentCouple = Assignment[];

type OverlapMethod = "full" | "partial";

export type { Assignment, AssignmentCouple, OverlapMethod };
