const {readInputFile} = require("../common");
const {extractNumbers, getSymbolIndexes} = require("./common");

const lines = readInputFile()
const symbolIndexes = getSymbolIndexes(lines, /[^\d.]/g)

let sum = 0;
for (const i in lines) {
    const line = lines[i]
    const numbers = extractNumbers(line, symbolIndexes[Number(i)-1]||[], symbolIndexes[i], symbolIndexes[Number(i)+1]||[])
    if (!numbers.length) {
        continue
    }
    sum += numbers.reduce((previousValue, currentValue) => {
        return previousValue + currentValue
    })
}
console.log(sum)