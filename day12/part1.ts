import {distributeAll} from "./lib.ts";

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

function reduceEmptySpaces(pattern: string) {
    let indexesToBeDropped: number[] = []
    let m;
    const regex = /\.\.+/g;
    while ((m = regex.exec(pattern)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        m.forEach((match, groupIndex) => {
            if (pattern.slice(m.index) === match) {
                // match et the end of the pattern
                for (let i = m.index; i < pattern.length; i++) {
                    indexesToBeDropped.push(i)
                }
            } else {
                // match in the pattern
                for (let i = 1; i < match.length; i++) {
                    indexesToBeDropped.push(i)
                }
            }
        });
    }
    let newPattern = ''
    for (const index in pattern) {
        if (indexesToBeDropped.includes(Number(index))) {
            continue
        }
        newPattern += pattern[index]
    }
    return {pattern: newPattern, remainingLength: indexesToBeDropped.length}
}

/**
 * Calculate variants by shifting onsen groups within the string
 */
function getShiftVariants(input: string) {
    let {pattern, remainingLength} = reduceEmptySpaces(input)

    let indexes = getBlankTilesIndexes(pattern)
    const variants = []
    for (let number = 0; number <= remainingLength; number++) {
        for (const map of distributeAll(indexes.length, number)) {
            let newPattern = ''
            for (const i in indexes) {
                const currentIndex = indexes[i]
                const nextIndex = indexes[Number(i)+1] || undefined
                if (i === '0' && currentIndex > 0) {
                    newPattern += pattern.slice(0, currentIndex)
                }
                newPattern += '.' // already on index
                for (let n = 0; n < (map.get(Number(i)+1) || 0); n++) {
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
    }
    return variants
}

function calculateVariants(onsen: string, groups: string): Set<string>
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

    const paddedBasicPattern = pad(basicPattern, totalLength)
    const variants = []
    variants.push(...paddedBasicPattern)
    for (const pattern of paddedBasicPattern) {
        for (const shiftVariant of getShiftVariants(pattern)) {
            variants.push(...pad(shiftVariant, totalLength))
        }
    }

    // Match variants with existing onsen string
    return new Set<string>(variants.filter((variant: string) => {
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
    }))
}

/**
 * ?????#??##??????# 1,3,3,3
 *
 * ..#.###.###...### 1,3,3,3
 * .#..###.###...### 1,3,3,3
 * .#.###..###...### 1,3,3,3
 * #..###..###...### 1,3,3,3
 * #...###.###...### 1,3,3,3
 */

const input = readInputFile()
let sum = 0
for (const line of input) {
    const splitLine = line.split(' ');
    const onsen = splitLine[0]
    const groups = splitLine[1]
    const variants = calculateVariants(onsen, groups)
    console.log(onsen, groups, variants.size)
    sum += variants.size
}
// 5829 too low
console.log(sum)