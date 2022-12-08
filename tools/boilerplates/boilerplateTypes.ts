type exampleType1 =
  | "X"
  | "Y"
  | "Z";

type exampleType2 =
  | "A"
  | "B"
  | "C";

type exampleTypeCombined = `${exampleType1} ${exampleType2}`;


export type { exampleType1, exampleType2, exampleTypeCombined };
