const CaloriesInventory = await Deno.readTextFile("CaloriesInventory.txt");

const caloriesRawArray = CaloriesInventory.split(/\n\n/);

const caloriesArray = [] as Array<any>;

const totalCaloriesArray = [] as Array<number>;


const arrayWrapper = (rawString: string) => {
  const singleNumber = rawString.split(/\n/);
  caloriesArray.push(singleNumber);
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

totalCaloriesArray.sort(function (a, b) {return b - a})

console.log(totalCaloriesArray[0]);
