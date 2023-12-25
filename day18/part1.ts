import {CharMap} from "../common-implementations/map.ts";
import {extractPairs, findDigSpots} from "./lib.ts";
import * as fs from "fs";
import * as path from "path";

const {readInputFile} = require("../common");

const input = readInputFile()

const map = new CharMap()

let currentX = 0
let currentY = 0
map.setChar('#', currentX, currentY)

for (const line of input) {
    const chunks = line.split(' ')
    const direction = chunks[0]
    const length = chunks[1]
    const color = chunks[2].slice(1, -1)

    for (let i = 0; i < length; i++) {
        if (direction === 'L') {
            currentX -= 1
        } else if (direction === 'R') {
            currentX += 1
        } else if (direction === 'D') {
            currentY += 1
        } else if (direction === 'U') {
            currentY -= 1
        }
        map.setChar('#', currentX, currentY)
    }
}
map.fillMissingSpots('.')
fs.writeFileSync(path.join(import.meta.dir, 'map.txt'), map.print())

const dugSpots = findDigSpots(map)
dugSpots.forEach((value, y) => {
    const xPairs = extractPairs(value, 1)
    for (const pair of xPairs) {
        for (let x = pair[0]+1; x < pair[1]; x++) {
            map.setChar('#', x, y)
        }
    }
})
fs.writeFileSync(path.join(import.meta.dir, 'map-filled.txt'), map.print())

// 32014 too low
// 48882 too low
// 47745 not correct
// 56354 too high
//console.log(map.findChar('#').length)