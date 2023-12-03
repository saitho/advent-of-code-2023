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
    index = Number(index)
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
            numbers.add(determineNumberAtIndex(previousLine, symbolIndex))
            numbers.add(determineNumberAtIndex(currentLine, symbolIndex))
            numbers.add(determineNumberAtIndex(nextLine, symbolIndex))

            numbers.add(determineNumberAtIndex(previousLine, symbolIndex-1))
            numbers.add(determineNumberAtIndex(currentLine, symbolIndex-1))
            numbers.add(determineNumberAtIndex(nextLine, symbolIndex-1))

            numbers.add(determineNumberAtIndex(previousLine, symbolIndex+1))
            numbers.add(determineNumberAtIndex(currentLine, symbolIndex+1))
            numbers.add(determineNumberAtIndex(nextLine, symbolIndex+1))

            numbers.delete('')
            allNumbers.push(numbers)
        }
    }
    return allNumbers
}

module.exports = {findNumbers}
