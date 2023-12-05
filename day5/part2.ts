import {extractNumbers, loadMaps, seedObjToLocation, sortByStart} from "./lib/maps.ts";
import {Range} from "./lib/seeds.ts";

const {readInputFile} = require("../common");

const input = readInputFile()

const seeds = extractNumbers(input.shift().split(': ')[1])

input.shift() // empty line
loadMaps(input)


const seedObjs: Range[] = []
for (let i = 0; i < seeds.length; i+=2) {
    const start = seeds[i]
    const range = seeds[i+1]
    seedObjs.push(new Range(start, range))
}
// Note: .sort()[0] does NOT always return the smallest value!!!!
// WRONG: console.log(seeds.map(s => seedToLocation(s)).sort()[0])
console.log(sortByStart(seedObjToLocation(seedObjs))[0].start)
