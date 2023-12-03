const {readInputFile} = require("../common");
const {findNumbers} = require("./common");

const lines = readInputFile()
const numbers = findNumbers(lines, /[^\d.]/g)
let sum = 0
for (let numberSet of numbers) {
    sum += [...numberSet].map(n => Number(n)).reduce((prev, curr) => prev+curr)
}
console.log(sum)
