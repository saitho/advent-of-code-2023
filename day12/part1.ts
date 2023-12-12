const {readInputFile} = require("../common");

function pad(pattern: string, totalLength: number): string[] {
    const variants = []
    const missingLetters = totalLength-pattern.length
    for (let i = 0; i <= missingLetters; i++) {
        let modified = ''
        for (let j = 0; j < i; j++) {
            modified += '.'
        }
        modified += pattern
        for (let j = 0; j < missingLetters-i; j++) {
            modified += '.'
        }
        variants.push(modified)
    }

    return variants
}

function getBlankTilesIndexes(pattern: string): number[]
{
    let m;
    let indexes: number[] = []
    const regex = /\./g;
    while ((m = regex.exec(pattern)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        indexes.push(m.index)
    }
    return indexes
}

function distribute(totalNumber: number, items: number, currentNumber = 1): Map<number, number>[] {
    const maps: Map<number, number>[] = []
    if (currentNumber > totalNumber || items <= 0) {
        return maps
    }
    for (let i = 0; i < items; i++) {
        const map = new Map<number, number>()
        map.set(currentNumber, i)
        const sub = distribute(totalNumber, items-i, currentNumber+1)
        sub.forEach((value, index) => {
            value.forEach((value1, key) => {
                map.set(key, value1)
            })
        })
        maps.push(map)
    }
    return maps
}

/**
 * Calculate variants by shifting onsen groups within the string
 */
function getShiftVariants(pattern: string, totalLength: number) {
    let remainingLength = totalLength-pattern.length
    let indexes = getBlankTilesIndexes(pattern)
    const variants = []
    const distribution = distribute(indexes.length, remainingLength)
    for (const map of distribution) {
        let newPattern = ''
        for (const i in indexes) {
            const currentIndex = indexes[i]
            const nextIndex = indexes[Number(i)+1] || undefined
            if (i === '0' && currentIndex > 0) {
                newPattern += pattern.slice(0, currentIndex)
            }
            newPattern += '.' // already on index
            for (let n = 0; n < map.get(Number(i)+1); n++) {
                newPattern += '.'
            }
            if (nextIndex !== undefined) {
                if (currentIndex+1 !== nextIndex) {
                    newPattern += pattern.slice(currentIndex+1, nextIndex)
                }
            } else {
                newPattern += pattern.slice(currentIndex+1)
            }
        }
        variants.push(newPattern)
    }
    return variants
}

function calculateVariants(onsen: string, groups: string): string[]
{
    const groupsTokens: number[] = groups.split(',').map(Number)
    let basicPattern = '';
    for (const i in groupsTokens) {
        const group = groupsTokens[i]
        for (let j = 0; j < group; j++) {
            basicPattern += '#'
        }
        basicPattern += '.'
    }
    if (basicPattern.endsWith('.')) {
        basicPattern = basicPattern.slice(0, -1)
    }
    let totalLength = onsen.length

    const variants = []
    variants.push(...pad(basicPattern, totalLength))
    for (const shiftVariant of getShiftVariants(basicPattern, totalLength)) {
        variants.push(...pad(shiftVariant, totalLength))
    }

    // Match variants with existing onsen string
    return variants.filter((variant: string) => {
        if (variant.length !== onsen.length) {
            return false
        }
        const onsenChars = onsen.split('')
        const variantChars = variant.split('')
        for (const i in variantChars) {
            if (variantChars[i] !== onsenChars[i] && onsenChars[i] !== '?') {
                return false
            }
        }
        return true
    })
}

/**
 * ?###???????? 3,2,1
 * .###.##.#...   ok
 * .###.##..#..
 * .###.##...#.
 * .###.##....#  ok
 * .###..##.#..
 * .###..##..#.
 * .###..##...#  ok
 * .###...##.#.
 * .###...##..#  ok
 * .###....##.#  ok
 */

const input = readInputFile()
for (const line of input) {
    const splitLine = line.split(' ');
    const onsen = splitLine[0]
    const groups = splitLine[1]
    console.log(calculateVariants(onsen, groups))
}