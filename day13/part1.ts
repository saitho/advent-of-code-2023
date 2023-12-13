import {CharMap, toCharMap} from "../common-implementations/map.ts";
import {findReflection} from "./lib.ts";

const {readInputFile} = require("../common");

function parsePatterns(input: string[]): string[][] {
    const patterns: string[][] = []
    let currentPattern: string[] = []
    for (const line of input) {
        if (line === '') {
            patterns.push(currentPattern)
            currentPattern = []
            continue
        }
        currentPattern.push(line)
    }
    if (currentPattern.length) {
        patterns.push(currentPattern)
    }
    return patterns
}

function findReflectionsY(map: CharMap) {
    let lines = []
    map.forX((value) => {
        lines.push(value.join(''))
    })
    return findReflection(lines)
}

function findReflectionsX(map: CharMap) {
    let lines = []
    map.forY((value) => {
        lines.push(value.join(''))
    })
    return findReflection(lines)
}

const input = readInputFile()
let sum = 0
for (const pattern of parsePatterns(input)) {
    const map = toCharMap(pattern)
    const yReflection = findReflectionsY(map)
    const xReflection = findReflectionsX(map)
    if (xReflection.length) {
        sum += xReflection.pop()
    }
    if (yReflection.length) {
        sum += yReflection.pop()*100
    }
}
// 42242 too high, 28054 too low
console.log(sum)