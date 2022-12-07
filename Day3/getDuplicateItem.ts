const getDuplicateItem = (rucksack: string) => {
  const secondPocket = rucksack.slice(rucksack.length / 2);
  let i = 0;
  while (i < rucksack.length) {
    if (secondPocket.includes(rucksack[i])) return rucksack[i];
    i++;
  }
  throw `No duplicate item found!`;
};

export { getDuplicateItem };
