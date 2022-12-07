type PlayerSelection =
  | "X"
  | "Y"
  | "Z";

type OpposingSelection =
| "A"
| "B"
| "C";

type Round = `${PlayerSelection} ${OpposingSelection}`;

export type {
    PlayerSelection,
    OpposingSelection,
    Round,
  };