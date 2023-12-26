import gainPossession from "./gainPossession.ts";
import rebound from "./rebound.ts";
import reboundInRound2 from "./reboundInRound2.ts";

export default (fieldSetup: string[], round2?: boolean): number => {
  let defensiveReboundPosition = 0;
  if (round2) {
    defensiveReboundPosition = reboundInRound2(fieldSetup);
  } else defensiveReboundPosition = rebound(fieldSetup);
  if (defensiveReboundPosition !== 0) {
    return 100 * defensiveReboundPosition;
  } else {
    const offensiveFieldSetup = gainPossession(fieldSetup);
    let offensiveReboundPosition = 0;
    if (round2) {
      offensiveReboundPosition = reboundInRound2(offensiveFieldSetup);
    } else offensiveReboundPosition = rebound(offensiveFieldSetup);
    if (offensiveReboundPosition === 0) {
      throw new Error(`No rebound positions found.`);
    }
    return offensiveReboundPosition;
  }
};
