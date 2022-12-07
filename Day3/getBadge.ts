const getBadge = (rucksacks: string[]) => {
  let i = 0;
  while (i < rucksacks[0].length) {
    if (
      rucksacks[1].includes(rucksacks[0][i]) &&
      rucksacks[2].includes(rucksacks[0][i])
    ) return rucksacks[0][i];
    i++;
  }
  if (rucksacks[0].length === 0) return "_";
  throw `No duplicate item found in ${rucksacks}!`;
};

export { getBadge };
