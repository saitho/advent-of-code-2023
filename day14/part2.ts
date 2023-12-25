import {CharMap, toCharMap} from "../common-implementations/map.ts";
import {getWeights, tiltMap} from "./lib.ts";

const {readInputFile} = require("../common");

const input = readInputFile()
const map = toCharMap(input)

let tiltedMap = map

let cycles = 1000000000

for (let i = 0; i < cycles; i++) {
    console.log(i)
    tiltedMap = tiltMap(tiltedMap, 'north')
    tiltedMap = tiltMap(tiltedMap, 'west')
    tiltedMap = tiltMap(tiltedMap, 'south')
    tiltedMap = tiltMap(tiltedMap, 'east')
}

console.log(tiltedMap.print())
console.log('')

console.log(getWeights(tiltedMap).reduce((sum, curr) => sum+curr))
