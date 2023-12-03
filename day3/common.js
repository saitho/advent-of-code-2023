/**
 * @param lines {string[]}
 * @param regex {RegExp}
 * @returns {number[][]}
 */
function getSymbolIndexes(lines, regex) {
    const indexes = [];
    for (const line of lines) {
        const currentLineIndexes = [];
        let m;
        while ((m = regex.exec(line)) !== null) {
            currentLineIndexes.push(m.index)
        }
        indexes.push(currentLineIndexes)
    }
    return indexes
}

/**
 * Zitat egges: "Wilde Methode"
 *
 * @param line {string}
 * @param index {number}
 * @param direction {string}
 * @returns {string}
 */
function determineDigitAtIndex(line, index, direction = '') {
    index = Number(index)
    if (index < 0 || index > line.length-1) {
        return ''
    }
    let numberAtPreviousIndex = direction !== 'right' ? determineDigitAtIndex(line, index-1, 'left') : ''
    let numberAtIndex = line[index].toString()
    let numberAtNextIndex = direction !== 'left' ? determineDigitAtIndex(line, index+1, 'right') : ''
    if (isNaN(parseInt(numberAtIndex))) {
        return ''
    }
    return numberAtPreviousIndex + numberAtIndex + numberAtNextIndex
}

/**
 *
 * @param lines {string[]}
 * @param symbolMatcher {RegExp}
 * @returns {Set[]}
 */
function findNumbers(lines, symbolMatcher) {
    const symbolIndexes = getSymbolIndexes(lines, symbolMatcher)
    const allNumbers = []
    for (let i in symbolIndexes) {
        i = Number(i)
        for (let symbolIndex of symbolIndexes[i]) {
            const previousLine = lines[i-1] || ''
            const currentLine = lines[i] || ''
            const nextLine = lines[i+1] || ''

            const numbers = new Set()
            numbers.add(determineDigitAtIndex(previousLine, symbolIndex))
            numbers.add(determineDigitAtIndex(currentLine, symbolIndex))
            numbers.add(determineDigitAtIndex(nextLine, symbolIndex))

            numbers.add(determineDigitAtIndex(previousLine, symbolIndex-1))
            numbers.add(determineDigitAtIndex(currentLine, symbolIndex-1))
            numbers.add(determineDigitAtIndex(nextLine, symbolIndex-1))

            numbers.add(determineDigitAtIndex(previousLine, symbolIndex+1))
            numbers.add(determineDigitAtIndex(currentLine, symbolIndex+1))
            numbers.add(determineDigitAtIndex(nextLine, symbolIndex+1))

            numbers.delete('')
            allNumbers.push(numbers)
        }
    }
    return allNumbers
}

module.exports = {findNumbers}
