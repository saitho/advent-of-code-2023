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

function determineNumberAtIndex(line, index, direction = '') {
    if (index < 0 || index > line.length-1) {
        return ''
    }
    let numberAtPreviousIndex = direction !== 'right' ? determineNumberAtIndex(line, index-1, 'left') : ''
    let numberAtIndex = line[index].toString()
    let numberAtNextIndex = direction !== 'left' ? determineNumberAtIndex(line, index+1, 'right') : ''
    if (isNaN(parseInt(numberAtIndex))) {
        return ''
    }
    return numberAtPreviousIndex + numberAtIndex + numberAtNextIndex
}

function extractNumbers(line, previousIndexes, currentIndexes, nextIndexes) {
    const numbers = []

    const allIndexes = [...previousIndexes, ...currentIndexes, ...nextIndexes]
    for (const index of allIndexes||[]) {
        const numberSet = new Set()
        numberSet.add(determineNumberAtIndex(line, index))
        numberSet.add(determineNumberAtIndex(line, index-1))
        numberSet.add(determineNumberAtIndex(line, index+1))
        numbers.push(...[...numberSet].map(n => parseInt(n)).filter(n => !isNaN(n)))
    }

    return numbers
}

module.exports = {extractNumbers, getSymbolIndexes}
