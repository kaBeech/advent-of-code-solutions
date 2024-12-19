import { convertMultiLineFileToArray } from "../../../tools/conversionFunctions/convertFileToArray.ts";
import { AntennaMap } from "./types.ts";

export default async (): Promise<AntennaMap> => {
  const playerMapString: string[] = await convertMultiLineFileToArray(
    "./test_input.dat",
    // "./challenge_input.dat",
  );
  const antennaMap: AntennaMap = {
    antennas: [],
    hw: { height: playerMapString.length, width: playerMapString[0].length },
  };
  playerMapString.forEach((line, yIndex) => {
    line.split('').forEach((frequency, xIndex) => {
      if (frequency !== '.') {
        antennaMap.antennas.push({
          frequency,
          coordinates: { x: xIndex, y: yIndex },
        });
      }
    });

  });
  return antennaMap;
};
