export interface Almanac {
  seeds: number[];
  seedMaps: SeedMap[];
}

export interface AlmanacPart2 {
  seeds: number[][];
  seedMaps: SeedMap[];
}

export interface SeedMapLine {
  sourceRangeStart: number;
  destinationRangeStart: number;
  rangeLength: number;
}

export type SeedMap = SeedMapLine[];
