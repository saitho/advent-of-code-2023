const {readInputFile} = require("../common");
const {determineNumberAtIndex, getSymbolIndexes} = require("./common");

const lines = readInputFile()
const symbolIndexes = getSymbolIndexes(lines, /\*/g)

let sum = 0
for (let i in symbolIndexes) {
    i = Number(i)
    for (let symbolIndex of symbolIndexes[i]) {
        const previousLine = lines[i-1] || ''
        const currentLine = lines[i] || ''
        const nextLine = lines[i+1] || ''

        const pairs = new Set()
        pairs.add(determineNumberAtIndex(previousLine, symbolIndex))
        pairs.add(determineNumberAtIndex(currentLine, symbolIndex))
        pairs.add(determineNumberAtIndex(nextLine, symbolIndex))

        pairs.add(determineNumberAtIndex(previousLine, symbolIndex-1))
        pairs.add(determineNumberAtIndex(currentLine, symbolIndex-1))
        pairs.add(determineNumberAtIndex(nextLine, symbolIndex-1))

        pairs.add(determineNumberAtIndex(previousLine, symbolIndex+1))
        pairs.add(determineNumberAtIndex(currentLine, symbolIndex+1))
        pairs.add(determineNumberAtIndex(nextLine, symbolIndex+1))

        pairs.delete('')
        if (pairs.size !== 2) {
            continue
        }
        sum += [...pairs].reduce((previousLine, curr) => previousLine*curr)
    }
}
console.log(sum)
