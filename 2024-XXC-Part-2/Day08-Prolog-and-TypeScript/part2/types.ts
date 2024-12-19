import { HeightWidth, XYCoordinates } from "../../../tools/commonTypes.ts";

export interface Antenna {
  frequency: string;
  coordinates: XYCoordinates;
}

export interface AntennaMap {
  antennas: Antenna[];
  hw: HeightWidth;
}

export interface NodeDict {
  [x: string]: number[];
}
