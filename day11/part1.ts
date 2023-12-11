import {CharMap, toCharMap} from "../common-implementations/map.ts";
import {findDistances} from "../common-implementations/coordinates.ts";

const {readInputFile} = require("../common");

const input = readInputFile()
const map = toCharMap(input)

function expandX(inputMap: CharMap): CharMap {
    const emptyGalaxiesY = inputMap.indexesY((values) => values.filter(v => v !== '.').length == 0)
    const expandedMap = new CharMap()
    let xCounter = 0
    inputMap.forX((values, y) => {
        for (const x in values) {
            const value = values[x]
            expandedMap.setChar(value, xCounter, y)
            xCounter++

            if (emptyGalaxiesY.includes(Number(x))) {
                for (const value of values) {
                    expandedMap.setChar('.', xCounter, y)
                }
                xCounter++
            }
        }
    })
    return expandedMap
}
function expandY(inputMap: CharMap): CharMap {
    const emptyGalaxiesX = inputMap.indexesX((values) => values.filter(v => v !== '.').length == 0)
    const expandedMap = new CharMap()
    inputMap.forY((values, x) => {
        let yCounter = 0
        for (const y in values) {
            expandedMap.setChar(values[y], Number(x), yCounter)
            yCounter++
            if (emptyGalaxiesX.includes(Number(y))) {
                for (const y in values) {
                    expandedMap.setChar('.', Number(x), yCounter)
                }
                yCounter++
            }
        }
    })
    return expandedMap
}

const expandedUniverse = expandX(expandY(map))
//const expandedUniverse = map

expandedUniverse.getMap().forEach((value, key) => {
    console.log([...value.values()].join(''))
})

const coords = expandedUniverse.toCoords((char) => char !== '.')

let sum = 0;
const processedPairs = []
for (const coord of coords) {
    const distances = findDistances(coords, coord)
    distances.forEach((value, key) => {
        if (processedPairs.includes(coord.label + '-' + key.label)) {
            return
        }
        processedPairs.push(coord.label + '-' + key.label)
        processedPairs.push(key.label + '-' + coord.label)
        sum += value
        console.log(coord.label + ' -> ' + key.label + ': ' + value)
    })
}
console.log(sum)