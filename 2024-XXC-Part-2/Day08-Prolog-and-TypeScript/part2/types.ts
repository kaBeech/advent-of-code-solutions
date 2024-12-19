import { XYCoordinates } from "../../../tools/commonTypes.ts";

export interface Elf {
  id: number;
  coordinates: XYCoordinates;
}

export type ElfMap = Elf[];
