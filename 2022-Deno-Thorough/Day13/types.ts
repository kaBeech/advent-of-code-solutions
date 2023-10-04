type exampleType1 =
  | "X"
  | "Y"
  | "Z";

type exampleType2 =
  | "A"
  | "B"
  | "C";

interface ExampleType3 {
  exampleFunction: () => number;
  exampleNullableFunction: () => number | undefined;
  exampleVoidFunction: (fewestSteps: number) => void;
}

interface ExampleType4 {
  exampleProperty: ExampleType3;
  exampleArray: ExampleType3[][];
}

type exampleTypeCombined = `${exampleType1} ${exampleType2}`;

export type { exampleType1, exampleType2, exampleTypeCombined };
