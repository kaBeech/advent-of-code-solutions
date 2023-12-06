export interface Almanac {
  seeds: number[];
  seedMaps: SeedMap[];
}

export interface SeedMapLine {
  sourceRangeStart: number;
  destinationRangeStart: number;
  rangeLength: number;
}

export type SeedMap = SeedMapLine[];
