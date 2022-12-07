type PlayerSelection =
  | "X"
  | "Y"
  | "Z";

type OpposingSelection =
| "A"
| "B"
| "C";

type Round = `${OpposingSelection} ${PlayerSelection}`;

type ScoringMethod =
| "simple"
| "crypto";

export type {
    PlayerSelection,
    OpposingSelection,
    Round,
    ScoringMethod,
  };