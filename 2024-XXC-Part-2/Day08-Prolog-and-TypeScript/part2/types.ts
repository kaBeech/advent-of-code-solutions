import { XYCoordinates } from "../../../tools/commonTypes.ts";

export interface Antenna {
  frequency: string;
  coordinates: XYCoordinates;
}

export type AntennaMap = Antenna[];
