const CaloriesInventory = await Deno.readTextFile("CaloriesInventory.txt");

const caloriesRawArray = CaloriesInventory.split(/\n\n/);

const caloriesArray = [] as Array<Array<number>>;

const totalCaloriesArray = [] as Array<number>;

const arrayWrapper = (rawString: string) => {
  const singleElfStringInventory = rawString.split(/\n/);
  const singleElfIntegerInventory = [] as Array<number>;
  const convertStringToNumber = (inputString: string) => {
    singleElfIntegerInventory.push(+inputString);
  };
  singleElfStringInventory.forEach(convertStringToNumber);
  caloriesArray.push(singleElfIntegerInventory);
};

caloriesRawArray.forEach(arrayWrapper);

const getSum = (values: Array<number>) => {
  let sum = 0;
  const addToSum = (integer: number) => {
    sum += integer;
  };
  values.forEach(addToSum);
  totalCaloriesArray.push(sum);
};

caloriesArray.forEach(getSum);

totalCaloriesArray.sort(function (a, b) {
  return b - a;
});

const top3ElvesTotalCaloriesSum = totalCaloriesArray[0] +
  totalCaloriesArray[1] + totalCaloriesArray[2];

console.log(top3ElvesTotalCaloriesSum);
