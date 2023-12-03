const {readInputFile} = require("../common");
const {findNumbers} = require("./common");

const lines = readInputFile()
const numbers = findNumbers(lines, /\*/g)
let sum = 0
for (let numberSet of numbers) {
    if (numberSet.size !== 2) {
        continue
    }
    sum += [...numberSet].map(n => Number(n)).reduce((prev, curr) => prev*curr)
}
console.log(sum)
