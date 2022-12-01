import CaloriesInventory from "./CaloriesInventory";

const caloriesRawArray = CaloriesInventory.split(/\n\n/)

const caloriesArray = [] as Array<any>

const arrayWrapper = (rawString: String) => {
    const singleNumber = rawString.split(/\n/);
    caloriesArray.push(singleNumber)
}

caloriesRawArray.forEach(arrayWrapper);

caloriesArray.sort(function (a, b) {return a - b})

console.log(caloriesArray)