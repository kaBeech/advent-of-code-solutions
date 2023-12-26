export default (fieldSetup: string[]): number => {
  const defensiveReboundPosition = rebound(fieldSetup);
  if (defensiveReboundPosition !== 0) {
    return 100 * defensiveReboundPosition;
  } else {
    const offensiveFieldSetup = gainPossession(fieldSetup);
    const offensiveReboundPosition = rebound(offensiveFieldSetup);
    if (offensiveReboundPosition === 0) {
      throw new Error(`No rebound positions found.`);
    }
    return offensiveReboundPosition;
  }
};
